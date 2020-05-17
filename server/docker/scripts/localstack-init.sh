source /.env

awslocal s3 mb s3://$BUCKET_NAME
awslocal s3api put-bucket-acl --bucket $BUCKET_NAME --acl public-read
