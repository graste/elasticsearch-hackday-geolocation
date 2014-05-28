define([
    "Main",
    "Widget",
    //"async!http://maps.google.com/maps/api/js?sensor=false"
    "async!https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"
], function(Main, Widget) {

    "use strict";

    var default_options = {
        prefix: 'NewsWidget'
    };

    var searchfield = null;
    var markers = [];
    var infoWindow = null;
    var defaultPosition = null;
    var initialTriangleCoords = [];
    var bounds = null;
    var rectangle = null;
    var mapOptions = {};
    var searchpolygon = null;
    var queryform = null;

    var NewsWidget = function(dom_element, options) {
        this.init(dom_element, default_options);
        this.addOptions(options);
        this.logDebug(this.options);
        this.searchfield = $("#search");

        this.queryform = $("#queryform");
        var that = this;
        this.queryform.bind("submit", function(){that.query();});

        this.clearOverlaysButton = $("#clearOverlays");
        this.clearOverlaysButton.bind("click", this.clearOverlays);

        this.deleteOverlaysButton = $("#deleteOverlays");
        this.deleteOverlaysButton.bind("click", this.deleteOverlays);

        this.showOverlaysButton = $("#showOverlays");
        this.showOverlaysButton.bind("click", this.showOverlays);

        this.hideInfoWindowButton = $("#hideInfoWindow");
        this.hideInfoWindowButton.bind("click", this.hideInfoWindow);

        this.markers = [];
        this.infoWindow = new google.maps.InfoWindow();
        this.defaultPosition = new google.maps.LatLng(52.519564, 13.408813);

        this.initialTriangleCoords = [
            new google.maps.LatLng(52.47, 13.37),
            new google.maps.LatLng(52.52, 13.30),
            new google.maps.LatLng(52.57, 13.45)
        ];

        this.bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(52.52, 13.3),
            new google.maps.LatLng(52.57, 13.45)
        );

        this.rectangle = new google.maps.Rectangle({
            bounds: this.bounds,
            editable: true,
            draggable: true
        });

        // setup the map
        this.mapOptions = {
            zoom: 12,
            center: this.defaultPosition,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        this.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);

        // Construct the search polygon
        this.searchPolygon = new google.maps.Polygon({
            map: this.map,
            paths: this.initialTriangleCoords,
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#0000FF',
            fillOpacity: 0.35,
            draggable: true,
            editable: true,
            geodesic: false
        });

        google.maps.event.addListener(this.searchPolygon, 'click', this.showArrays);

        //this.rectangle.setMap(map);
    };

    NewsWidget.prototype = new Widget();
    NewsWidget.prototype.constructor = NewsWidget;

    NewsWidget.prototype.getLocationFilter = function() {
        var geofilter = {
            "geo_polygon": {
                "location.coordinates": {
                    "points": [
                    {
                        "lat": 52,
                        "lon": 13
                    },
                    {
                        "lat": 54,
                        "lon": 11
                    },
                    {
                        "lat": 52,
                        "lon": 15
                    }
                    ]
                }
            }
        };

        var coords = [];
        var vertices = this.searchPolygon.getPath();
        for (var i =0; i < vertices.getLength(); i++) {
            var xy = vertices.getAt(i);
            var p = { "lat": xy.lat(), "lon": xy.lng() };
            coords.push(p);
        }

        geofilter.geo_polygon['location.coordinates'].points = coords;
        var points = geofilter.geo_polygon['location.coordinates'].points;
        this.logDebug('geodata:', points[0], points[1], points [2]);

        return geofilter;
    };

    // execute search filter query depending on currently drawn polygon on map
    NewsWidget.prototype.query = function() {
        var that = this;

        var searchquery = {
            "match": {
                "_all": this.searchfield.val()
            }
        };

        var data = {};

        data.filter = this.getLocationFilter();

        if (this.searchfield.val() !== '')
        {
            data.query = searchquery;
        }

        //this.searchPolygon = this.rectangle;

        this.logDebug('Query', JSON.stringify(data));

        $.ajax({
            //url: 'http://bigdataweek1.syseleven.de:9200/imdb/actors/_search',
            //url: 'http://bigdataweek1.syseleven.de:9223/berlinonline/localnews/_search',
            url: 'http://localhost:9200/localnews/news_item/_search',
            type: 'POST',
            //contentType: 'application/json; charset=UTF-8',
            crossDomain: true,
            dataType: 'json',
            data: JSON.stringify(data),
            success: function(response) {
                that.logDebug('response:', response);
                that.logDebug('data: ', response.hits.hits);
                var data = response.hits.hits;
                var doc_ids = [];
                var source = null;
                var content = '<ul>';

                    that.clearOverlays();
                    that.deleteOverlays();
                    if (data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++)
                        {
                            doc_ids.push(data[i]._id);
                            var source_link = '<a target="_blank" href="http://berlinonline.de/nachrichten/foo/' + data[i]._id + '">' + data[i]._source.title + '</a>';
                            content = content + '<li>' + source_link + '</li>';
                            latlng = new google.maps.LatLng(
                                data[i]._source.location.coordinates.lat,
                                data[i]._source.location.coordinates.lon
                            );

                            var marker_overlay_content = '' + data[i]._source.teaser + '<br><br>Original News: ' + source_link;
                            addMarker(latlng, data[i]._source.title, marker_overlay_content);
                        }

                        content += '</ul>';

                    that.showOverlays();

                    that.showInfoWindow(content);
                }
                else
                {
                    that.showInfoWindow('nothing found...');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var jso = jQuery.parseJSON(jqXHR.responseText);
                that.logDebug(arguments);
                that.showInfoWindow('Error: ' + jso.error);
            }
        });

        return false;
    };

    // add autocomplete to search field (even though this makes not much sense after all in this demo)
    NewsWidget.prototype.addAutoSuggest = function() {
        this.logDebug('addAutoSuggest');
        var that = this;
        $( "#search" ).autocomplete({
            source: function( request, response ) {
                var query = {
                    "query": {
                        "match_phrase_prefix": {
                            "title": request.term
                        }
                    },
                    "fields": [
                        "title",
                        "teaser",
                        "publish_date"
                    ]
                };

                query.filter = that.getLocationFilter();

                $.ajax({
                    //url: 'http://bigdataweek1.syseleven.de:9223/berlinonline/localnews/_search',
                    url: 'http://localhost:9200/localnews/news_item/_search',
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify(query),
                    success: function( data ) {
                        response( $.map( data.hits.hits, function( item ) {
                            that.logDebug(item);
                            return {
                                label: item.fields.title,
                                id: item.fields._id
                            }
                        }));
                    }
                });
            },
            minLength: 2,
            select: function( event, ui ) {
                that.logDebug(ui.item); //$("#search").val(ui.item.id);
            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            }
        })
    };

    // Add a marker to the map and push to the array.
    NewsWidget.prototype.addMarker = function(pos, title, content) {
        var that = this;
        var marker = new google.maps.Marker({
            "position": pos,
            "map": this.map,
            "title": title || ""
        });

        google.maps.event.addListener(marker, 'click', function() { 
            that.map.setCenter(new google.maps.LatLng(marker.position.lat(), marker.position.lng()));
            that.map.setZoom(12);
            that.showInfoWindow(content, new google.maps.LatLng(marker.position.lat(), marker.position.lng()));
        });

        this.markers.push(marker);
    };

    // Sets the map on all markers in the array.
    NewsWidget.prototype.setAllMap = function(map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    };

    // Removes the overlays from the map, but keeps them in the array.
    NewsWidget.prototype.clearOverlays = function() {
        this.setAllMap(null);
    };

    // Shows any overlays currently in the array.
    NewsWidget.prototype.showOverlays = function() {
        this.setAllMap(this.map);
    };

    // Deletes all markers in the array by removing references to them.
    NewsWidget.prototype.deleteOverlays = function() {
        this.clearOverlays();
        this.markers = [];
    };

    // Display info window with some content on some position
    NewsWidget.prototype.showInfoWindow = function(content, pos, _map) {
        this.infoWindow.setContent(content || 'no content given');
        this.infoWindow.setPosition(pos || this.defaultPosition);
        this.infoWindow.open(_map || this.map);
    };

    // Hide info window
    NewsWidget.prototype.hideInfoWindow = function() {
        this.infoWindow.close();
    };

    // @this {google.maps.Polygon}
    NewsWidget.prototype.showArrays = function(event) {
        // Since this Polygon only has one path, we can call getPath()
        // to return the MVCArray of LatLngs
        var vertices = this.getPath();

        var contentString = 'ElasticSearch Polygon<br>';
        contentString += 'Clicked Location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() + '<br><br>Polygon Position:';

        // Iterate over the vertices.
        for (var i =0; i < vertices.getLength(); i++) {
            var xy = vertices.getAt(i);
            contentString += '<br>' + 'Coordinate: ' + i + '<br>' + xy.lat() +',' + xy.lng();
        }

        this.showInfoWindow(contentString, event.latLng);
    };

    NewsWidget.prototype.onSuggestedTermsReceived = function(result) {
        this.logDebug('Received message', result);
    };

    return NewsWidget;

}, function (err) {
    // err has err.requireType (timeout, nodefine, scripterror)
    // and err.requireModules (an array of module Ids/paths)
});
