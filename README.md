# Veryfi SDK for Node.js

<img src="https://user-images.githubusercontent.com/30125790/212157461-58bdc714-2f89-44c2-8e4d-d42bee74854e.png#gh-dark-mode-only" width="200">
<img src="https://user-images.githubusercontent.com/30125790/212157486-bfd08c5d-9337-4b78-be6f-230dc63838ba.png#gh-light-mode-only" width="200">

[![Node.js - version](https://img.shields.io/badge/node-%3E%3D%206.0.0-brightgreen)](https://www.npmjs.com/package/@veryfi/veryfi-sdk)
[![npm](https://img.shields.io/badge/npm-v7.0.0-blue)](https://www.npmjs.com/package/@veryfi/veryfi-sdk)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

## Table of Contents

- [Veryfi SDK for Node.js](#veryfi-sdk-for-nodejs)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
    - [Obtaining Client ID and user keys](#obtaining-client-id-and-user-keys)
    - [Node.js API Client Library](#nodejs-api-client-library)
    - [Extracting Data](#extracting-data)
    - [Response](#response)
    - [Updating a document](#updating-a-document)
  - [Need help?](#need-help)
    - [Learn more at our blog](#learn-more-at-our-blog)
  - [Tutorial Video](#tutorial-video)

**veryfi-nodejs** is a Node.js module for communicating with the [Veryfi OCR API](https://veryfi.com/api/)

## Installation

Install from [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), a package manager for Javascript.

```bash
npm i @veryfi/veryfi-sdk
```

You may need to run the above command with `sudo`.

## Getting Started

### Obtaining Client ID and user keys

If you don't have an account with Veryfi, please go ahead and register here: [https://app.veryfi.com/signup/api/](https://app.veryfi.com/signup/api/)

### Node.js API Client Library

The **veryfi** library can be used to communicate with Veryfi API. All available functionality is described here: <https://veryfi.github.io/veryfi-nodejs/>

Below is a sample script using **Veryfi** for OCR and extracting data from a document:

### Extracting Data

```js
const Client = require('@veryfi/veryfi-sdk');
const client_id = 'your_client_id';
const client_secret = 'your_client_secret';
const username = 'your_username';
const api_key = 'your_password';

const categories = ['Grocery', 'Utilities', 'Travel'];
const file_path = './test/receipt.png';
```

This submits a document for processing (3-5 seconds for a response)

```js
let veryfi_client = new Client(client_id, client_secret, username, api_key);
let response = veryfi_client.process_document(file_path, categories=categories).then(response => {
  console.log(response)
});
```

...or with a URL

```js
let response = veryfi_client.process_document_url(url, external_id=some_id).then(response => {
  console.log(response)
});
```

### Response

```json
{
  "account_number": "test1",
          "accounting_entry_type": "debit",
          "balance": null,
          "barcodes": [
    {
      "data": "101785617711518",
      "type": "CODE128"
    }
  ],
          "bill_to": {
    "address": null,
            "email": null,
            "name": null,
            "parsed_address": null,
            "phone_number": null,
            "reg_number": null,
            "vat_number": null
  },
  "cashback": null,
          "category": "Supplies",
          "created_date": "2024-10-31 14:38:27",
          "currency_code": "USD",
          "custom_fields": {
    "box_number": null,
            "dsadasas": "dasdsadas",
            "foo": "bar"
  },
  "date": "2018-10-17 09:03:00",
          "default_category": "Job Supplies",
          "delivery_date": null,
          "delivery_note_number": null,
          "discount": null,
          "document_reference_number": null,
          "document_title": null,
          "document_type": "receipt",
          "due_date": null,
          "duplicate_of": null,
          "exch_rate": 1,
          "external_id": null,
          "final_balance": null,
          "guest_count": null,
          "id": 255371329,
          "img_blur": false,
          "img_file_name": "255371329.png",
          "img_thumbnail_url": "https://scdn.veryfi.com/receipts/919ba4778c039560/d9477032-8537-41cf-97dd-56cb1443a576/thumbnail.png?Expires=1730386417&Signature=VNRx8OISmHUsbPk3YAItcUteEAb4GyLxHTplgCxDxGD2NDE05I7XG~92ikhZhz6oTfCPGqLc7l5Zw0PmDD7di07ZCWRqkpB2OSPUU9ZlHbDLnpenGC7QscEaf8mPb8k0UDKXMY7gw8GCCoRS7IirMnN8aIpaKeRvukIKYCJMqEkX9ncf247BcLyYvnOV20gLieIT1~mofcCebUakr3hBSAbThN0vwYNDXSqth-IpNpDAMcm-nU71KlJWFqdRv4~m3NljwhFkXy1eTK3JiV97EfZJ-Nj~MUxBKWhIjBS~~l-Dp218ogv53Ws8llP5r1RiRrdgqIOtx-8xKa21WU8vbQ__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ",
          "img_url": "https://scdn.veryfi.com/receipts/919ba4778c039560/d9477032-8537-41cf-97dd-56cb1443a576/8e9aebdd-d4f6-4fec-97c8-237dc5bd190d.png?Expires=1730386417&Signature=HTydoDEasZLN7C0QTj-flLCqUqruI3ereSbllb2SEDHrxQTXZPqQ99HE87E5OsWzDmtNumGXYs4UFPjSSOOidUy38EbmyOEljp0VFxPwXMMrJtoVGGShIkTHg-desK3r0fx6xy9l~IX16SEtNCQyZLrzkjTRp0xU9kM1kVuBueW6JewxXUfiIlPu~ITwbwr7PtqRG6uHB3X1myrRXBSv-arbTaLvCrBrmIMGz0gaPH5dA~ehhDSIRvxaKTNTWX-MBloNHfhz~v7xYJyFooDwetyxV968JqGlR-Jx6EAillWbnuflfH5R~VRr~CAtbCsz9gM6q2nqVXPhDDRUl~hrkA__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ",
          "incoterms": null,
          "insurance": null,
          "invoice_number": "17717",
          "is_approved": false,
          "is_blurry": [
    false
  ],
          "is_document": true,
          "is_duplicate": false,
          "is_money_in": false,
          "is_transaction": false,
          "license_plate_number": null,
          "line_items": [
    {
      "category": "Supplies",
      "country_of_origin": null,
      "custom_fields": {},
      "date": null,
      "description": "SNIP LEFT <A>\nWISS LEFT-CUT SNIPS",
      "discount": 4,
      "discount_price": null,
      "discount_rate": null,
      "end_date": null,
      "full_description": "SNIP LEFT <A>\nWISS LEFT-CUT SNIPS",
      "gross_total": null,
      "hsn": null,
      "id": 1146544820,
      "lot": null,
      "manufacturer": null,
      "net_total": null,
      "normalized_description": null,
      "order": 0,
      "price": null,
      "quantity": 1,
      "reference": null,
      "section": null,
      "sku": "037103136480",
      "start_date": null,
      "subtotal": null,
      "tags": [
        "line_items_total_greater_than_1"
      ],
      "tax": null,
      "tax_code": null,
      "tax_rate": null,
      "text": "037103136480 SNIP LEFT <A>\t9.97\nWISS LEFT-CUT SNIPS$4.00",
      "total": 9.97,
      "type": "product",
      "unit_of_measure": null,
      "upc": null,
      "weight": null
    },
    {
      "category": "Supplies",
      "country_of_origin": null,
      "custom_fields": {},
      "date": null,
      "description": "MILW5PCKBLDG <A>\nMKE 5PK GENERAL PURPOSE BLADES",
      "discount": null,
      "discount_price": null,
      "discount_rate": null,
      "end_date": null,
      "full_description": "MILW5PCKBLDG <A>\nMKE 5PK GENERAL PURPOSE BLADES",
      "gross_total": null,
      "hsn": null,
      "id": 1146544822,
      "lot": null,
      "manufacturer": null,
      "net_total": null,
      "normalized_description": null,
      "order": 1,
      "price": null,
      "quantity": 1,
      "reference": null,
      "section": null,
      "sku": "045242268061",
      "start_date": null,
      "subtotal": null,
      "tags": [
        "line_items_total_greater_than_1"
      ],
      "tax": null,
      "tax_code": null,
      "tax_rate": null,
      "text": "045242268061 MILW5PCKBLDG <A>\t1.18\nMKE 5PK GENERAL PURPOSE BLADES",
      "total": 1.18,
      "type": "product",
      "unit_of_measure": null,
      "upc": null,
      "weight": null
    },
    {
      "category": "Supplies",
      "country_of_origin": null,
      "custom_fields": {},
      "date": null,
      "description": "1LB. SCREW <A>\nEB NEO SELF-DRILLING 12X1",
      "discount": null,
      "discount_price": null,
      "discount_rate": null,
      "end_date": null,
      "full_description": "1LB. SCREW <A>\nEB NEO SELF-DRILLING 12X1",
      "gross_total": null,
      "hsn": null,
      "id": 1146544824,
      "lot": null,
      "manufacturer": null,
      "net_total": null,
      "normalized_description": null,
      "order": 2,
      "price": null,
      "quantity": 1,
      "reference": null,
      "section": null,
      "sku": "038902058966",
      "start_date": null,
      "subtotal": null,
      "tags": [
        "line_items_total_greater_than_1"
      ],
      "tax": null,
      "tax_code": null,
      "tax_rate": null,
      "text": "038902058966 1LB. SCREW <A>\t10.57\nEB NEO SELF-DRILLING 12X1",
      "total": 10.57,
      "type": "product",
      "unit_of_measure": null,
      "upc": null,
      "weight": null
    },
    {
      "category": "Supplies",
      "country_of_origin": null,
      "custom_fields": {},
      "date": null,
      "description": "1LB. SCREW <A>\nEB NEO SELF-DRILLING 12X3/4",
      "discount": null,
      "discount_price": null,
      "discount_rate": null,
      "end_date": null,
      "full_description": "1LB. SCREW <A>\nEB NEO SELF-DRILLING 12X3/4",
      "gross_total": null,
      "hsn": null,
      "id": 1146544825,
      "lot": null,
      "manufacturer": null,
      "net_total": null,
      "normalized_description": null,
      "order": 3,
      "price": null,
      "quantity": 1,
      "reference": null,
      "section": null,
      "sku": "038902058959",
      "start_date": null,
      "subtotal": null,
      "tags": [
        "line_items_total_greater_than_1"
      ],
      "tax": null,
      "tax_code": null,
      "tax_rate": null,
      "text": "038902058959 1LB. SCREW <A>\t10.57\nEB NEO SELF-DRILLING 12X3/4",
      "total": 10.57,
      "type": "product",
      "unit_of_measure": null,
      "upc": null,
      "weight": null
    }
  ],
          "meta": {
    "device_id": null,
            "device_user_uuid": null,
            "duplicates": [
      {
        "id": 214960758,
        "score": 1,
        "url": "https://scdn.veryfi.com/receipts/919ba4778c039560/801c6b7b-8d26-459a-ae4a-db58306e34d3/a9c63167-a8e8-4ed2-8fad-7d06cb17beb3.png?Expires=1730386417&Signature=dbq1l7GZCl7K6rXaiSVMUsoDez6OqL9eapnC83AS3YX-o0omgmaoXGaN3K4nYd1w45U5FnNvB~Fca3nlEh4OVui4HfIK-IQPrc-SED8RHVnfCIM74cD5rDw0lokgT-SAkj5JAVohkHC0WHl-vfXWz-PoYRD6PPs-vkSTnvRdsRMPJRjU2-d9EPj6Rqx1sAm9JEMjIOllHCmpNyeuNaRcBTrPDmv5Z7KpiA4ZbDaEmtpDBJiC4CGsPf4ZgBc9zQy4a~J2Zj54TZPrcU5gVg6WCKibhopCVzw2nuW0TmaHZaxFGmK~W642VzMp3oCBZ1izwfUAJvcPx4WN7fzsp~Txlw__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ"
      },
      {
        "id": 214966753,
        "score": 1,
        "url": "https://scdn.veryfi.com/receipts/919ba4778c039560/ceeb34fd-f810-4319-9fd4-b8b1293ad5fb/ef5987c8-e27b-45cb-b009-a12070a68651.png?Expires=1730386417&Signature=OKiIfd6gWDTAjcgIpvSxmk-0KdsZxnEqTwy3Vb85VuZEIkyG31O4ueQy-IwwsTsxa~unKoK4A-N0XEy8dWSvycUwsHZIshyUYyn2sIDqaPdeKQoOAAf3qpAGTFATPujAqnpo0dws0CyDMdpzt0E~D9~tKzFx1W6isq0~eTXEG-~2GTaKG~bEniEgv~xbwJfVINC5O86HDq-bjNjl6Zx~pWlal~LKoANF1SiyRQGHLw4SaE85kTE5FeTUds4b7OyKPqavqa34hGaNWQt0WoPStcfhhXMzaMxX5uefA5eMlMjcW7Iz2jrnU1L1QjTLDHeZ9w3rCHQwlCZuEmG3IJ8R0g__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ"
      },
      {
        "id": 214966696,
        "score": 1,
        "url": "https://scdn.veryfi.com/receipts/919ba4778c039560/47446fc9-9ace-411c-8cac-8d8a7378d058/d0de825f-6ed7-4723-92c4-9d48237eba24.png?Expires=1730386417&Signature=GdhaDVHWsiBJi3YUyWonDYfVsUe6uTiXdx0V1CBXRayLPdMqfCVGpPYmlFlsZjBFhvNAS-~D7rHwoZINKa~TIBBYfnZemwjaXmdn~R~ybEic1DbQD~3fU3DecpSEDt76iZRDK~HFefF5BXPHXVhoYqstU7hJFZ~qYR2jpN5hynoMFn6~jY4~0L81msre2lPN3X71yD7ibcdcRbnGCnpT-7sNTrNZ-7CEv9oV1uAbhu54No~B-2XHb6jTgi2q1PM9CkwRJu9dvRtOp~asYQr7gN5EvFpn0yCeUj4Lhv64mwpKYhogFVpHkNAzFSYcplDd522-qbY39cjDNi1F4E4Taw__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ"
      },
      {
        "id": 214971025,
        "score": 1,
        "url": "https://scdn.veryfi.com/receipts/919ba4778c039560/76d57a9c-2eb7-49dd-b406-eb55a8ac7b7c/693dc46a-89c9-4dff-a7ea-a3d17e18f0a2.png?Expires=1730386417&Signature=I-d8it0jM0EotcxPiltR9JvOYLWhcdflj5yGzQdw5zWrN2s95~wN8mrczHLYGUHvirEljD4tJew1Ob43DcMLEnl~6Mx-nLYAsDAKWAwN5GDzoBjCD1ddQwnr~irhVymdesnSNc50wIDT9GcpMfgpUfndHK~BslgLBRTz3UgQZQfxHhCveJq5J1oAZZnW-7hPcfvW92C8-M9d6yjwsw7SoN~gGFu7qs8cgQXWS2K0ZjiyaG3RqJhKnVF57JXtM966-J7F3z4woED~dTy-ZAOFdG-Vdg0cCri11183wpU5MJNCfrh-obMvVJA1XzqyjaFM6hB1ruTriBz-k7FmXsvsbg__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ"
      },
      {
        "id": 214971108,
        "score": 1,
        "url": "https://scdn.veryfi.com/receipts/919ba4778c039560/4bffa87e-a2e4-480f-86c7-b1267a9bfb9e/1c057703-a1b2-4f7f-b809-16ba79a9635c.png?Expires=1730386417&Signature=Qhv0ZOl5p~AC7n3A0yIhDofWZhR3OHpQl2k2Fzl9DAqaJ6oc8KjCkOr86HNQT2cdOj6ZPF4lR1Wiy~jjY1keExdoOpAGAef2FFUCt8~R6UWFCKY7mZZD8ETqgMMzkMhvVvFsR~Y3tJ8l7NALp~-1YuYghmT~nycJMj0V37s~f0rPc9ft-YbmoIsnwRkSyLWIf6YDOHEbRmrNqvW0VdektyNWPJgreaWENu9ZmZyawCVXcExU~zBsHJx0ySeIqMx7fzVkxeXghTKPgKjOIcCKuqlGAAx0f0jRJ4z8BV8T1n~l0MOezvAL3j3NudWilDkgz8eDWA458GXOgmbxlX-Klw__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ"
      },
      {
        "id": 214971072,
        "score": 1,
        "url": "https://scdn.veryfi.com/receipts/919ba4778c039560/135de1f0-b2bb-4a9d-a4ac-2c70c22eb0d9/fd301613-7850-4b0c-b491-5e6f0113a9e6.png?Expires=1730386417&Signature=VD6teyIDHsCXFzgwXsyJrTf506tIqxCAXd1XPnKzpTUhTVoO-lOLh-I9ieucFG4RaL0GeebnOqhiZ1D7nPAiY2h1b2H33rKPp0jRWx0aw7m4L4Vh0-b01URvIJ~D-cnW~iv8CpFGB1AO4voydNqNoMyJSzzdCb1VRbpKpsUkzIhn8n01XkVm7z-98tnSobzh97YLM7-zjDdcNi9bm09Y2HmlepEzl4jHUwIUi-OkG9l12EMj8mWDR2hU5WkL1iIEe8qe6pZkBn4saLyDqE1C42q8ojeaVrV5rDdWpZ7b-QYwkrhmO0Epz6-6ueDKdt6rCBys5m~nWj8-uxNB33SgQA__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ"
      },
      {
        "id": 214963213,
        "score": 1,
        "url": "https://scdn.veryfi.com/receipts/919ba4778c039560/ec3b5f22-0d69-49d1-af88-29930edbd19b/2efe3e17-0740-40a5-bd8e-9bb1a96e5718.png?Expires=1730386417&Signature=NdBSHpukLcy2WSvMCnAcAQ-4tkblzeWn~0dmMAukIwm7h~hEz4-01FeglTNU4SmIcylx5X4I8ptydn5rHAIYRHVndHjmpS08dien56sd0JDR3bEgOEqbVfdvfw8K-ibOjEE-00Vbor0NqrhQIfZJX7uSxHU4Ugv-mPRa2TGojTUWCNRPkbNMwj-wqeO3AbTnuTr7sA3tVHkWatFMA1g2WrUH0-HMulRXNCFNuSDhuPc-t4FVdJ2e6SElyUxIYhMzeuSzsK0G0B~qk0KYeEv7dkDwMfl6FLmiV0YOwG40KyKNLkjy1HnUJS7WWuxbU4wzjPjICQK6lw7-Z8MO7IsMew__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ"
      },
      {
        "id": 214969026,
        "score": 1,
        "url": "https://scdn.veryfi.com/receipts/919ba4778c039560/a59dcd7d-43be-4ad8-a713-6b496b1ae6fb/491d164e-9002-45b3-9913-890af8b9a3a1.png?Expires=1730386417&Signature=F7l1Altw3P9gCO2C~1yiP-bHAjDd5n4aMYozvIBP55sRC5GF~IgHGMs7~rG6ux~uNjOTFwvT8o-iMhz9S6NSXH5R2YtReqVV0-RyBqQWN2sTbwn0VF-ytXiVGBnh2AxHRKBPc7QCxtsdFYS8~NNFDyVcPPFsr0aJL78Yrr7Gbq4e~~ld2ZvkyUo0t31dmMXj8YkquXNqsQ7xyow31rXukvE1PKC7aOn31h4SCbUauVnniHs0iysIYyCrgdf5FYTApdDINTkHANXHYZxXdSXJX6mpTp5ZZ~j-uTDmGSzq9kBdHQxivoHVt~iW4mS8rigBbUc~KNhXyW2SofvSzA2Vyg__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ"
      },
      {
        "id": 214973908,
        "score": 1,
        "url": "https://scdn.veryfi.com/receipts/919ba4778c039560/d26a7012-126e-4f88-8fad-df3914d3b609/65a98087-04c9-4685-bc30-26e4244a84ea.png?Expires=1730386417&Signature=P8LGG2ZuD3rl6U6RCRmuogoV9lhoF4J54lqTMEwUhKhyLQSKyHj81SWQFqQpTV5TiFlwbuAHWzGN-EXCXmy4fkvte9srQcNBkA6iLk6yDsi4-m26lxdhDYgoV0lGJn0UArmfSUgOOGak0OTZFOB0HOntyOZN9RpdvcBwEvZRuqZ8tML8X2EKQAnxklrtdxiZhlzayNSc4zgoYflQpTBU7XJX~XvTCj2~2shhwwQapqG901L1qn2e3ZcS0TU6t9iw9CZWxcHRh~swEGXBR-N7PXtWPrJletoovUFtNYczki2oiXBQCvoX7afQ3J~F8IdJcrN6OrX1WFRJfqxJhD-UlA__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ"
      },
      {
        "id": 214973989,
        "score": 1,
        "url": "https://scdn.veryfi.com/receipts/919ba4778c039560/d6684aac-f493-4094-9f15-ec9fe105aa71/b3c2a9d9-e1e8-457f-a05d-277136bfedc0.png?Expires=1730386417&Signature=NMAkp1yzYH2oFlH7Pie5yQeJUzb1-9pu7RG6ljBzD2Xela9Jbdax1Gn1~fBrWB3xulUFueejXxMyuUvQd0hH08ZrAEpCTLI4Djo4x8-bf5LzKt~wWubp9B~aCuSFOab2rszgmCBRA5OBie8BAletWJYj5GoQZ-Cwp~yKk9rPILZTH6PggsPbNlvsNs0p-v4R7ryK3IQH3AMDRlwmrPzJSQpCsNKufvcB6dmPkju6vJaI05I1vVg4tBooVlssyaoH3UOvlhG435u~sgw6Y4fWG1nsfT~vOjqa~-VtFPD8DBfsEQIzEEFz7ydbewvFDF-tlnef3283sDMxk6~U~hAitQ__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ"
      }
    ],
            "fraud": {
      "attribution": null,
              "color": "green",
              "custom_types": [],
              "decision": "Not Fraud",
              "images": [
        {
          "is_lcd": false,
          "score": 0.95
        }
      ],
              "pages": [
        {
          "is_lcd": {
            "score": 0.95,
            "value": false
          }
        }
      ],
              "score": 0.05,
              "submissions": {},
      "types": [],
              "version": null
    },
    "handwritten_fields": [],
            "language": [
      "en"
    ],
            "owner": "devapitest",
            "pages": [
      {
        "height": 1848,
        "is_blurry": {
          "score": 0.97,
          "value": false
        },
        "language": [
          "en"
        ],
        "screenshot": {
          "score": 0.9399999976158142,
          "type": null
        },
        "width": 1048
      }
    ],
            "processed_pages": 1,
            "source": "api",
            "source_documents": [
      {
        "height": 1848,
        "size_kb": 990,
        "width": 1048
      }
    ],
            "total_pages": 1,
            "warnings": [
      {
        "message": "Decoded Barcode numbers were not found on the document",
        "type": "barcode_code_missing_in_ocr"
      }
    ]
  },
  "model": "2.50.0",
          "notes": null,
          "ocr_text": "HOME\nTHE\n\tMore saving.\n\tMore doing.\"\n\n2250 SOUTHGATE RD, COLORADO SPRINGS, CO\nBECKY NATION STOREMANAGER 719-471-0054\n1518 00000 17717 10/17/18 09:03 AM\nSELF CHECK OUT\n037103136480 SNIP LEFT <A>\t9.97\nWISS LEFT-CUT SNIPS\nNLP Savings\t$4.00\n045242268061 MILW5PCKBLDG <A>\t1.18\nMKE 5PK GENERAL PURPOSE BLADES\n038902058966 1LB. SCREW <A>\t10.57\nEB NEO SELF-DRILLING 12X1\n038902058959 1LB. SCREW <A>\t10.57\nEB NEO SELF-DRILLING 12X3/4\nSUBTOTAL\t32.29\nSALES TAX\t2.66\nTOTAL\t$34.95\nXXXXXXXXXXXX7373 VISA\n\tUSD$ 34.95\nAUTH CODE 025972/8585391\tTA\nAID A0000003131010\t4341505054414C204F4\nE452050595341\nDEPOT",
          "order_date": null,
          "payment": {
    "card_number": "7373",
            "display_name": "Visa ***7373",
            "terms": null,
            "type": "visa"
  },
  "pdf_url": "https://scdn.veryfi.com/receipts/919ba4778c039560/d9477032-8537-41cf-97dd-56cb1443a576/cde38dad-6123-454f-842b-e794b108a880.pdf?Expires=1730386417&Signature=MpQOcHRbhvhiOACw~Hg4T6htbXg3tnRgbn0vmIgVYBzcYY2aYsW~lKjBFchpFQAtB-pk2nhZqfFaQRAZKhWAVTJdV5Kje4fneAP205-ekOK5LdB~CfrxcE-gfX6v3GTAKGijYoyWwW9Vodgxnfr3T6EBJc27v1aE~lwF1wXu0nsCLhqp1vnO1BWbxQHF6lW2Pzc9RRZ5qPOpiGRLhu5WbtilboBgTYy30EjQWT1oNeK2GmsteYsx0ygBvV1l92e-0cPgs5kJZnZ7hGNTWyc83MwnZt9KbWcV2Kz3X0T5q902XxmEQ4zKO5XfuIjY~pKLE-~39NxZdg32lRNOKj38Gg__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ",
          "previous_balance": null,
          "purchase_order_number": null,
          "reference_number": "VCDHD-71329",
          "rounding": null,
          "server_name": null,
          "service_end_date": null,
          "service_start_date": null,
          "ship_date": null,
          "ship_to": {
    "address": null,
            "name": null,
            "parsed_address": null
  },
  "shipping": null,
          "status": "processed",
          "store_number": "1518",
          "subtotal": 32.29,
          "tags": [
    {
      "id": 9018171,
      "name": "line_items_total_greater_than_1"
    },
    {
      "id": 9018172,
      "name": "is_document"
    },
    {
      "id": 9018173,
      "name": "total_greater_than_1"
    },
    {
      "id": 9018396,
      "name": "extract_tags"
    },
    {
      "id": 9277238,
      "name": "is_fraud_green"
    },
    {
      "id": 12926297,
      "name": "test_rule_1_failure"
    }
  ],
          "tax": 2.66,
          "tax_lines": [],
          "tip": null,
          "total": 34.95,
          "total_pages": 1,
          "total_quantity": null,
          "total_weight": null,
          "tracking_number": null,
          "tracking_numbers": [
    null
  ],
          "updated_date": "2024-10-31 14:38:35",
          "vending_person": null,
          "vending_person_number": null,
          "vendor": {
    "abn_number": null,
            "account_currency": null,
            "account_number": null,
            "address": "2250 SOUTHGATE RD, COLORADO SPRINGS, CO",
            "bank_breakdown": [
      {}
    ],
            "bank_name": null,
            "bank_number": null,
            "bank_swift": null,
            "biller_code": null,
            "category": "Nurseries & Gardening",
            "country_code": "US",
            "email": null,
            "external_id": null,
            "external_ids": [],
            "fax_number": null,
            "iban": null,
            "lat": 38.798985,
            "lng": -104.819856,
            "logo": "https://cdn.veryfi.com/logos/us/051403134.jpg",
            "logo_name": "the home depot",
            "map_url": "https://www.google.com/maps/search/?api=1&query=Home+Depot+2250+SOUTHGATE+RD,+COLORADO+SPRINGS,+CO",
            "name": "Home Depot",
            "order_number": null,
            "parsed_address": {},
    "phone_number": "719-471-0054",
            "raw_address": "2250 SOUTHGATE RD, COLORADO SPRINGS, CO\nBECKY NATION",
            "raw_name": "DEPOT",
            "reg_number": null,
            "type": "Nurseries & Gardening",
            "vat_number": "452050595341",
            "web": null
  },
  "vendors": [
    "Home Depot"
  ],
          "vin_number": null,
          "warnings": [],
          "weights": [
    null
  ]
}
```

### Updating a document

```js
let new_vendor = {"name": "Starbucks", "address": "123 Easy Str, San Francisco, CA 94158"};
let category = "Meals & Entertainment";
let new_total = 11.23;
veryfi_client.update_document(id=12345,
    {
        'vendor': new_vendor,
        'category': new_category,
        'total': new_total
    })
.then(response => {
  console.log(response)
});
```

## Need help?
Visit https://docs.veryfi.com/ to access integration guides and usage notes in the Veryfi API Documentation Portal

If you run into any issue or need help installing or using the library, please contact support@veryfi.com.

If you found a bug in this library or would like new features added, then open an issue or pull requests against this repo!

### [API Docs](https://docs.veryfi.com/)

### [Learn more at our blog](https://www.veryfi.com/nodejs/)

## Tutorial Video

[![Veryfi Tutorial](https://img.youtube.com/vi/PcJdgnvyfBc/maxresdefault.jpg)](https://www.youtube.com/watch?v=PcJdgnvyfBc)
