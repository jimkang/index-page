# index-it.js

Rough script that makes index pages that have links to the files in a directory, like the directory listing provided by nginx or Apache, so you can have that when using S3-like object storage.

## Usage

  npx index-it <directory with files> [comma-separated file extensions] [files per page]

## Example

  npx index-it pictures/2024 png,jpg,jpeg 20

This should put an `index.html` (and maybe an `index-1.html` and a `index-2.html`, etc.) in `pictures/2024`.
