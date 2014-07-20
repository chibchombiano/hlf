var dataSourceExtensions = {
            updateField: function (e) {
                var ds = this;
                $.each(ds._data, function (idx, record) {
                    if (record[e.keyField] == e.keyValue) {
                        ds._data[idx][e.updateField] = e.updateValue;
                        //ds.read(ds._data);
                        return false;
                    }
                });
            },    		
            existeElemento: function (e) {
                var ds = this;
                var resultado = false;
                $.each(ds._data, function (idx, record) {
                    if (record[e.keyField] == e.keyValue) {
                        resultado = true;                        
                    }
                });

                return resultado;
            }
        };

$.extend(true, kendo.data.DataSource.prototype, dataSourceExtensions);
