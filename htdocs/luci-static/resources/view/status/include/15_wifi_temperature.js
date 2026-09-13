'use strict';
'require baseclass';
'require fs';

return baseclass.extend({
    title: _('Wi-Fi radio temperature'),

    load: function() {
        return fs.exec('/usr/libexec/luci-wifi-temperature').then(function(res) {
            try { return JSON.parse(res.stdout); }
            catch (e) { return {}; }
        });
    },

    render: function(data) {
        var rows = [];
        function add(label, value) {
            rows.push(E('div', { 'class': 'tr' }, [
                E('div', { 'class': 'td left', 'style': 'width:50%' }, [_(label)]),
                E('div', { 'class': 'td left' }, [value == null ? _('Not available') : (value / 1000).toFixed(1) + ' °C'])
            ]));
        }
        add('Device temperature', data.device);
        add('Wi-Fi 2.4 GHz', data.radio24);
        add('Wi-Fi 5 GHz', data.radio5);
        return E('div', { 'class': 'table' }, rows);
    }
});
