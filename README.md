#heroku:

heroku -v     --> to check whether heroku is pre-installed or not.
heroku login  --> to login heroku

#Deploying app to heroku:

--> heroku keys:add

#ssh:

--> ls -a -l ~/.ssh  --> command to check if the ssh already exists

--> ssh-keygen -t rsa -b 4096 -C "sagarshukla010@gmail.com" --> to generate the key
//here -b stands for bits , -C stands for comments
//after pasting the above command in the terminal, press enter three times.

--> eval "$(ssh-agent -s)" --> to check whether ssh running fine

--> ssh-add -K ~/.ssh/id_rsa

--> cat ~/.ssh/id_rsa.pub   --> to view your generated ssh key

--> ssh -T git@github.com   --> to test the ssh connection

