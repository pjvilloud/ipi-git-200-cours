#!/bin/bash
mkdir -p screenshots
rm -rf screenshots/*.png
decktape  --screenshots --screenshots-directory screenshots --screenshots-size 1920x1080 impress file://`pwd`/index.html?showPopover=true ipi-git-200-cours.pdf
rm ipi-git-200-cours.pdf
cd screenshots
convert `ls -1v` ../ipi-git-200-cours.pdf
cd ..