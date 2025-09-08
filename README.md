# SHUTTER SDK

[![License](https://img.shields.io/github/license/Councilbox/shutter-sdk)]()
[![Version](https://img.shields.io/github/package-json/v/Councilbox/shutter-sdk)]()
[![NPM](https://img.shields.io/npm/v/@councilbox/shutter-sdk)]()

A javascript sdk for Shutter built in typescript. This can be used
in node or in the browser\*.

NOTE: If used in the browser do not publish your private api key in frontend
code.

- [Install](#install)
- [Setup Client](#setup-client)
- [Methods](#methods)

## Install

- Requires node.js >= 18.x

```sh
npm i @councilbox/shutter-sdk
```

## Setup Client

Next, require the module and instantiate a shutter client by calling
`new Shutter` and setup the client with basic auth credentials
`(email: 'example@mail.com', password: 'your_pass_here')`. Also need an api url
provided by shutter team.

```js
import Shutter from "@councilbox/shutter-sdk";

const shutter = new Shutter({
  email: "example@mail.com",
  password: "your_pass_here",
  uri: "example.shutter.com",
});
```

## Documentation
Typescript documentation is available [here](https://councilbox.github.io/shutter-sdk/).


<!-- METHODS_START -->

## Methods

### users

- create
- delete
- me

### organizations

- create
- delete
- list
- update

### rooms

- attendeesUrls
- close
- create
- delete
- get
- list
- start
- startExternalStreaming
- startMassiveStreaming
- startRecording
- stopExternalStreaming
- stopMassiveStreaming
- stopRecording
- update
- updateStatus

### attendees

- create
- delete
- denyWord
- get
- getURL
- grantWord
- list
- lowerHand
- mute
- raiseHand
- startTrack
- stopTrack
- update

### recordings

- getIframeUrl
- list

### frames

- captureAttendee
- captureRoom
- get
- list

<!-- METHODS_END -->