#!/bin/bash

# Download external assets to local folder:
cat ./external-urls.txt | xargs -P4 -n1 curl -O
