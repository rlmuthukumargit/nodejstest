const USER_TYPE = {
	'USER': 1, 
	'ADMIN': 2,
	'SUBADMIN': 3, 
	'STOREMANAGER': 4
}; 

const GENDER = {
	Male:'Male',
	Female:'Female',
	Others:'Others'
}

const USER_STATUS = {
	'ACTIVE': 1,
	'IN-ACTIVE': 2,
	'DELETED': 3
};

const STATUS = {
	'ACTIVE': 1,
	'IN-ACTIVE': 2,
	'DELETED': 3
};

const ACTIVITY_TYPE = {
	LoggedIn: 'LoggedIn',
	LoggedOut: 'LoggedOut'
};

const ACTIVITY_MESSAGE = {
	LoggedIn: 'User successfully logged in!',
	LoggedOut: 'User successfully logged out!'
};

const ADDRESS_STATUS = {
	'ACTIVE': 1,
	'DELETED': 2
};

const SUB_ADMIN_RIGHTS = {
	'READ':1,
	'WRITE':2,
	'FULLACCESS':3
};


const PAYMENT_STATUS={   
	Success:'Success',
	Initiated:'Initiated',
    Failure:'Failure',
    Cancelled:'Cancelled'
 } 


 const PAYMENT_TYPE = {    
	Paytm:'Paytm',
    Razor:'Razorpay', 
    TBD:'TBD'
 } 

 const PAYMENT_MODE = {    
	PAYTM:'Balance', 
    UPI:'UPI', 
    NETBANKING:'Netbanking',
    CARD:'Card',
    WALLET:'Wallet', // other wallet 
    TBDWALLET:'TBDWallet'
 }

 const S3_FOLDER_NAME={  
	PRODUCT_IMAGES:'products-images',
    BANNER_IMAGES:'banners-images',
    PROFILE_IMAGES:'profile-images',
	BLOG_IMAGES: 'blog-images',
	REVIEW_REPORT_IMAGES: 'review-report-issue-images',
	WORKSHOP_IMAGES: 'workshop-images',
 	OTHERS:'others',
 }

 const PLATFORM_TYPE={   
	Mobile:'Mobile',
    Web:'Web', 
    Both:'Both'
 }  


module.exports = {
	USER_TYPE,
	USER_STATUS,
	ADDRESS_STATUS, 
	PAYMENT_STATUS,
	S3_FOLDER_NAME,
	PAYMENT_TYPE,
	PAYMENT_MODE,
	PLATFORM_TYPE,
	SUB_ADMIN_RIGHTS,
	ACTIVITY_TYPE,
	ACTIVITY_MESSAGE,
	GENDER, 
	STATUS
}