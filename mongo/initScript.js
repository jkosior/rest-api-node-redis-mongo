db = db.getSiblingDB('app');
db.createUser({
    user: "appadmin",
    pwd: "vFE7RFQat5tPhdUC",
    roles: [{
        role: "readWrite",
        db: "app"
    }]
});
