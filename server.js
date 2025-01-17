var express = require( 'express')
var util = require('util');
var app = express()
var cf_app = require( './app/vcap_application')
var cf_svc = require( './app/vcap_services')
var ccs_tender_api = require( './app/ccs_tender_api')

app.set( 'views', __dirname + '/views')
app.set( 'view engine', 'jade')
app.use( express.static( __dirname + '/public'))

app.get( '/', function ( req, res) {

  ccs_tender_api.get_event_types().then(function(result) {
    res.render( 'pages/index', {
      app_environment:      app.settings.env,
      application_name:     cf_app.get_app_name(),
      app_uris:             cf_app.get_app_uris(),
      app_space_name:       cf_app.get_app_space(),
      app_index:            cf_app.get_app_index(),
      app_mem_limits:       cf_app.get_app_mem_limits(),
      app_disk_limits:      cf_app.get_app_disk_limits(),
      service_label:        cf_svc.get_service_label(),
      service_name:         cf_svc.get_service_name(),
      service_plan:         cf_svc.get_service_plan(),
      event_types:          util.inspect(result, {depth: null})
    })
  });
  
})

app.listen( process.env.PORT || 4000)
