'use strict';
'require baseclass';
'require fs';

return baseclass.extend({
    title: _('Wi-Fi radio temperature'),

    load: function() {
        return fs.exec('/usr/libexec/luci-wifi-temperature').then(function(res) {
            if (res.code !== 0)
                return {};

            try {
                return JSON.parse(res.stdout || '{}');
            }
            catch (e) {
                return {};
            }
        }).catch(function() {
            return {};
        });
    },

    render: function(data) {
        data = data || {};

        function temperature(value) {
            return (typeof value === 'number' && isFinite(value))
                ? (value / 1000).toFixed(1) + ' °C'
                : _('Not available');
        }

        function row(label, value) {
            return E('div', { 'class': 'tr' }, [
                E('div', { 'class': 'td left', 'style': 'width:50%' }, label),
                E('div', { 'class': 'td left' }, temperature(value))
            ]);
        }

        return E('div', { 'class': 'table' }, [
            row(_('Highest Wi-Fi temperature'), data.device),
            row(_('Wi-Fi 2.4 GHz'), data.radio24),
            row(_('Wi-Fi 5 GHz'), data.radio5)
        ]);
    }
});
