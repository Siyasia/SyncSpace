const awsmobile = {
    aws_project_region: "us-east-1", // AWS region
    aws_cognito_identity_pool_id: "", // Leave empty if no identity pool is set up
    aws_cognito_region: "us-east-1", // Cognito region
    aws_user_pools_id: "us-east-1_a9bZqWn7P", // User Pool ID
    aws_user_pools_web_client_id: "1nniebum18eulh49quvtt1ncc4", // Replace with the App Client ID
    oauth: {
        domain: "syncspace.auth.us-east-1.amazoncognito.com", // Cognito domain
        scope: ["openid", "email", "profile"],
        redirectSignIn: "https://main.d5ao4x13qp48x.amplifyapp.com",
        redirectSignOut: "https://main.d5ao4x13qp48x.amplifyapp.com",
        responseType: "code", // Authorization code grant flow
    },
};

export default awsmobile;
