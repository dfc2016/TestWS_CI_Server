'use strict';

app.home = kendo.observable({
    onShow: function() {},
    afterShow: function() {
        
     // var dataSource = new kendo.data.DataSource({
     //      transport: {
     //        read: {
     //          url: "http://digiweb-online.com/ci/index.php/servizioweb-test",
     //          dataType: "json"
     //        }
     //      }
     //  });
     //  dataSource.fetch(function(){
     //      var data = this.data();
     //      console.log("DFC >> data length: "+data.length);          
     //  });
        
    }
});

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function loadNews()
{
    var dsNews = new kendo.data.DataSource({
        transport: {
            // OK funziona, ottimizzare per grandi vol. di dati || paginazione
            // Parametrizzare la URL con una variabile idUsuario
            read: {
                url: "http://digiweb-online.com/ci/index.php/servizioweb-test",
                dataType: "json"
            },
        },
        schema: {
            model: {
                id: "id",
                fields: {
                    id: {
                        editable: false,
                        nullable: true,
                        type: "string"
                    },
                    title: {
                        type: "string"
                    },
                }
            }
        },
        requestStart: function (e) {
            console.log("DFC >>> Request Start");
        },
        requestEnd: function (e) {
            console.log("DFC >>> Request End");
        },
        error: function (e) {            
            alert("El Servicio no esta Disponible.");
        }
    });
    
    dsNews.fetch(function () {
        $("#lstNews").kendoMobileListView({
                dataSource: dsNews,
                template: kendo.template($("#tmpLstNews").html()), 
        });
    });
}
// END_CUSTOM_CODE_home