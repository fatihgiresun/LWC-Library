import { LightningElement, api, wire } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Account.BillingCity',
    'Account.BillingCountry',
    'Account.BillingPostalCode',
    'Account.BillingState',
    'Account.BillingStreet'
];

export default class Address1 extends LightningElement {
    @api recordId;
    mapMarkers = [];

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredRecord({ error, data }) {
        if (error) {
            console.log('Hata geldi:', error);
        } else if (data) {
            const sehir = getFieldValue(data, 'Account.BillingCity');
            const ulke = getFieldValue(data, 'Account.BillingCountry');
            const postaKodu = getFieldValue(data, 'Account.BillingPostalCode');
            const eyalet = getFieldValue(data, 'Account.BillingState');
            const sokak = getFieldValue(data, 'Account.BillingStreet');

            this.mapMarkers = [
                {
                    location: {
                        City: sehir,
                        Country: ulke,
                        PostalCode: postaKodu,
                        State: eyalet,
                        Street: sokak
                    },
                    
                }
            ];
        }
    }
}