#!/bin/bash
address="http://localhost:3000"
site_name="myapp"
for var in "$@"
do
echo "var is $var"
  case "$var" in
 	'-d')
	    address='http://localhost:8080/debug?port=5858'
	;;
	'-n')
	echo "$var"
            site_name="$var[1]"   
	;;
  esac
done

#create address

create_site()
{
    echo "$site_name"
    cp ./meteor-config.json ./"$site_name".json
    sed -i -r -e 's/app_name_here/'"$site_name"'/g' ./"$site_name".json
    rm -f -R "$site_name"
    meteor-kitchen ./"$site_name".json ./"$site_name"
    cd ./"$site_name"
}




echo "$address"

    if [ ! -f $BROWSER ]; then
      echo 'browser'
      $BROWSER "$address"
    elif which xdg-open > /dev/null; then
      echo 'xdg-open'
      xdg-open "$address"
    elif which gnome-open > /dev/null; then
      echo 'gnome-open'
      gnome-open "$address"
    else
      echo "Could not detect the web browser to use."
    fi

create_site

meteor
