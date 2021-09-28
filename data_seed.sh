#!/usr/bin/env bash
echo -n Instance Name: 
read -s instance_name
echo

if [ $instance_name = "local" ]
then
  instance_name="--local"
else
  instance_name="--instance $instance_name"
fi  
  

if ! [ -e ".gdrive.secrets.json" ]
then 
  echo "gdrive secrets file does not exist. It is required to get csvs for seeding"
  echo "Medics secrets is in our password manager"
fi

if ! [ -e "csvs-on-google-drive.json" ]
then 
  echo "csvs-on-google-drive.json file does not exist. It is required to get csvs for seeding"
  echo "See details here https://git.io/fjtSf"
fi

cht fetch-csvs-from-google-drive
cht csv-to-docs
cht $instance_name upload-docs
cht $instance_name  create-users
