#!/bin/bash
curl -X POST -H "Origin: https://photos.google.com" --data-urlencode @req_body.txt https://photos.google.com/_/PhotosUi/data/batchexecute -v