#!/bin/bash
dotnet publish --configuration Release
cd bin/Release/netcoreapp3.0/publish
dotnet Guestbook.dll
read -p "Press enter to continue"
