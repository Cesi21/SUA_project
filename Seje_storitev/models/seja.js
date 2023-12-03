class Seja {
    constructor(_id, title, description, location, start, end, organizer, 
        contact) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.start = start;
        this.end = end;
        this.organizer = organizer;
        this.contact = contact;
    }
}

module.exports = Seja;

const sejeRoutes = require('./routes/seje');
app.use('/seje', sejeRoutes);
