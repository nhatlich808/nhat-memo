---
title: "Useful command on Linux (ubuntu)"
date: "2025-07-15"
excerpt: ""
author: "Nhat"
tag: "linux command"
eid: "8"
---

#### 1. Check the `inodes`

```
df -i
```

#### 2. Check folder `inodes` with sort

```
du -s --inodes * | sort -rn
```

#### 3. Filter old files in specific folder

```
find <folder> -type f -mtime <time> | wc -l

// example: find all files that created time is greater than thirdty days 

find sessions/ -type f -mtime +30 | wc -l
```

#### 4. Check real path of symbolink folder

```
realpath <folder>

// example: check real path of /var/lib/php/sessions

realpath /var/lib/php/sessions

```

#### 5. Find large files

```
find ./ -type f -not -path "./.git/*" -size +50M -exec ls -sh {} +

// find in multiple folder

find ./ -type f -not -path "./.git/*" -not -path "./.composer-cache/*" -not -path "./vendor/magento/zendframework1/.git/*" -size +50M -exec ls -sh {} +

```

#### 6. Find file by its name

```
find . -name thisfile.txt

find /home -name *.jpg
```

#### 7. Create a symbolink

```
ln -s <source> <destination>

// example: create a nginx configure symbolink 

ln -s /etc/nginx/sites-available/m245ce /etc/nginx/sites-enabled/m245ce
```

#### 8. Get VPN ip hostname

```
hostname -I | awk '{print $1}'
```

#### 9. Compress folder but exclude specific child folder

```
zip -r var.zip var -x "var/backups/*"
zip -r -y code.zip code/ -x code/dist/**\* code/log/**\*
```

#### 10. Compress folder using tar

```
tar -czvf archive.tar.gz folder_name
```

#### 11. Extract .tar file

```
tar -xzvf archive.tar.gz
```

#### 12. Copy files but ignore existing

```
rsync -av --ignore-existing /home/user/source/ /home/user/destination/
```

#### 13. Use SCP command to download

```
scp developer@127.0.0.1:/home/user/code/backup.tar.gz .

// use scp command with private key, custom port

scp -i ~/.ssh/priv_key.pem -P 3022 developer@127.0.0.1:/home/user/code/backup.tar.gz .
```

#### 14. Use SCP command to upload

```
scp backup.tar.gz developer@127.0.0.1:/home/user/code/

// use scp command with private key, custom port

scp -i ~/.ssh/priv_key.pem -P 3022 backup.tar.gz developer@127.0.0.1:/home/user/code/
```

#### 15. Check users

```
// list users and their group

getent group

// get user's group by user name

getent group <user-name>
```