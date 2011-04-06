/**
 * Slovenian translation by Matjaž (UTF-8 encoding)
 * 25 April 2007
 */

Ext.onReady(function() {
    if(Ext.Updater) {
        Ext.Updater.defaults.indicatorText = '<div class="loading-indicator">Nalagam...</div>';
    }

    if(Ext.DataView){
       Ext.DataView.prototype.emptyText = "";
    }

    if(Ext.grid.GridPanel){
       Ext.grid.GridPanel.prototype.ddText = "{0} izbranih vrstic";
    }

    if(Ext.TabPanelItem){
       Ext.TabPanelItem.prototype.closeText = "Zapri zavihek";
    }

    if(Ext.form.BaseField){
       Ext.form.BaseField.prototype.invalidText = "Neveljavna vrednost";
    }

    if(Ext.LoadMask){
        Ext.LoadMask.prototype.msg = "Nalagam...";
    }

    if(Ext.Date) {
        Ext.Date.monthNames = [
           "Januar",
           "Februar",
           "Marec",
           "April",
           "Maj",
           "Junij",
           "Julij",
           "Avgust",
           "September",
           "Oktober",
           "November",
           "December"
        ];

        Ext.Date.dayNames = [
           "Nedelja",
           "Ponedeljek",
           "Torek",
           "Sreda",
           "Četrtek",
           "Petek",
           "Sobota"
        ];
    }
    if(Ext.MessageBox){
       Ext.MessageBox.buttonText = {
          ok     : "V redu",
          cancel : "Prekliči",
          yes    : "Da",
          no     : "Ne"
       };
    }

    if(Ext.util.Format){
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ac',  // Slovenian Euro
            dateFormat: 'd.m.Y'
        });
    }

    if(Ext.picker.Date){
       Ext.apply(Ext.picker.Date.prototype, {
          todayText         : "Danes",
          minText           : "Navedeni datum je pred spodnjim datumom",
          maxText           : "Navedeni datum je za zgornjim datumom",
          disabledDaysText  : "",
          disabledDatesText : "",
          monthNames	: Ext.Date.monthNames,
          dayNames		: Ext.Date.dayNames,
          nextText          : 'Naslednji mesec (Control+Desno)',
          prevText          : 'Prejšnji mesec (Control+Levo)',
          monthYearText     : 'Izberite mesec (Control+Gor/Dol za premik let)',
          todayTip          : "{0} (Preslednica)",
          format            : "d.m.y",
          startDay          : 1
       });
    }

    if(Ext.toolbar.PagingToolbar){
       Ext.apply(Ext.PagingToolbar.prototype, {
          beforePageText : "Stran",
          afterPageText  : "od {0}",
          firstText      : "Prva stran",
          prevText       : "Prejšnja stran",
          nextText       : "Naslednja stran",
          lastText       : "Zadnja stran",
          refreshText    : "Osveži",
          displayMsg     : "Prikazujem {0} - {1} od {2}",
          emptyMsg       : 'Ni podatkov za prikaz'
       });
    }

    if(Ext.form.Text){
       Ext.apply(Ext.form.Text.prototype, {
          minLengthText : "Minimalna dolžina tega polja je {0}",
          maxLengthText : "Maksimalna dolžina tega polja je {0}",
          blankText     : "To polje je obvezno",
          regexText     : "",
          emptyText     : null
       });
    }

    if(Ext.form.Number){
       Ext.apply(Ext.form.Number.prototype, {
          minText : "Minimalna vrednost tega polja je {0}",
          maxText : "Maksimalna vrednost tega polja je {0}",
          nanText : "{0} ni veljavna številka"
       });
    }

    if(Ext.form.Date){
       Ext.apply(Ext.form.Date.prototype, {
          disabledDaysText  : "Onemogočen",
          disabledDatesText : "Onemogočen",
          minText           : "Datum mora biti po {0}",
          maxText           : "Datum mora biti pred {0}",
          invalidText       : "{0} ni veljaven datum - mora biti v tem formatu {1}",
          format            : "d.m.y"
       });
    }

    if(Ext.form.ComboBox){
       Ext.apply(Ext.form.ComboBox.prototype, {
          loadingText       : "Nalagam...",
          valueNotFoundText : undefined
       });
    }

    if(Ext.form.VTypes){
       Ext.apply(Ext.form.VTypes, {
          emailText    : 'To polje je e-mail naslov formata "ime@domena.si"',
          urlText      : 'To polje je URL naslov formata "http:/'+'/www.domena.si"',
          alphaText    : 'To polje lahko vsebuje samo črke in _',
          alphanumText : 'To polje lahko vsebuje samo črke, številke in _'
       });
    }

    if(Ext.grid.HeaderContainer){
       Ext.apply(Ext.grid.HeaderContainer.prototype, {
          sortAscText  : "Sortiraj naraščajoče",
          sortDescText : "Sortiraj padajoče",
          lockText     : "Zakleni stolpec",
          unlockText   : "Odkleni stolpec",
          columnsText  : "Stolpci"
       });
    }

    if(Ext.grid.PropertyColumnModel){
       Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
          nameText   : "Ime",
          valueText  : "Vrednost",
          dateFormat : "j.m.Y"
       });
    }

    if(Ext.layout.BorderLayout && Ext.layout.BorderLayout.SplitRegion){
       Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
          splitTip            : "Potegni za razširitev.",
          collapsibleSplitTip : "Potegni za razširitev. Dvojni klik, če želite skriti."
       });
    }
});