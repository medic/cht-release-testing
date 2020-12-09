Using custom hierarchy.

Download your app_settings.json
Replace the contact_types key to the values in the contact_types.json file.
Upload your app_settings.json
Using medic-conf upload the contact forms in the `repo/custom_hierarchy/forms/contact/` folder. 

  `medic-conf --url=https://<user>:<password>@localhost  convert-contact-forms upload-contact-forms`

Then download the english language file. Add the translations from english_translations.properties and reupload. This will make the dot notation be replaced by friendly names