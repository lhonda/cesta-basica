#!/bin/sh

echo "Building and Shipping 'Cesta Basica Report Factory Lambda"
echo "Verifying if build zip exists ..."
if [ -f "./build.zip" ]
then
  rm ./build.zip
fi

echo "Finished installing production modules!"
echo "Starting to zip build..."
zip -r ./build.zip . -x build.sh .gitignore
echo "Zipping finished! Build is complete!"
