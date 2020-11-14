# Photo Gallery

Authors: **Patryk Wylegała**.

This project was created as part of 'Cognifide' recruitment. It is a simple website written in JavaScript. We can view all photos, enlarge one of them by clicking on the given picture or filter images by available buttons. More at [Functional](#functional). After a year, the design has been updated with major changes. Project has been completly rebuild, logically corrected and improvement. Most of the bugs have been eliminated and what's more - new functionality has been added.

## Table of contents

- [Functional](#functional)
- [Additionial](#additionial)
- [Installation](#installation)
- [Usage](#usage)
  - [Development server](#development-server)
  - [Development build](#development-build)
  - [Production build](#production-build)
- [Image](#image)
- [Support](#support)
- [App information](#app-information)

## Functional

- Upon page load, request is made to `http://www.splashbase.co/api/v1/images/search?query=tree`. Results displayed accordingly to the designs.
- Show more button render additional items.
- Filters at the top of the page allow to filter out only visible images coming from selected sites.
- Hovering over given image display an image provider name (sites) set on transparent background covering this image.
- Clicking on the given image display an enlarged image (inside the modal).
- Invented by me:
  - Filters (buttons in the navigation) are automatically rendered based on all available sites in the photos.
  - Modal can be closed by clicking button or outside container.
  - Transitions and some animations (zoom).

## Additionial

- Accessibility and responsiveness (works on mobile devices).
- Correct typography ([Montserrat font](https://fonts.google.com/specimen/Montserrat) for body copy, [Allura font](https://fonts.google.com/specimen/Allura) for heading text).
- The gallery work as a Single Page Application (no reload on user interactions).

## Installation

```
[Node] (https://nodejs.org/en/)
```

```
[Npm] (https://docs.npmjs.com/getting-started/installing-node)
```

```
$ git clone https://github.com/MrVaath/Photo-Gallery.git
$ cd Photo-Gallery
$ npm install
```

## Usage

### Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:8080/`.

### Development build

Run `npm run build-dev` to build the project. The build artifacts will be stored in the `dist/` directory.

### Production build

Run `npm run build-prod` for a production build. The build artifacts will be stored in the `dist/` directory.

## Image

![alt tag](https://github.com/MrVaath/Cognifide_UI_homework/blob/master/dist/img/result.png)

## Support

Contact me via email

> **pat.wylegala@gmail.com**

## App information

**Language**: _HTML_, _CSS_, _JavaScript_

**Version**: _2.0.0_

**Year**: _2019_
