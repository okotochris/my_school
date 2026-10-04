const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        school: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        visibility: {
            type: String,
            enum: ['public', 'private'],
            default: 'private',
            index: true
        },

        author: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: ['published', 'draft'],
            default: 'published',
            index: true
        },

        image: {
            url: {
                type: String,
                default: ''
            },
            public_id: {
                type: String,
                default: ''
            }
        },

        publishedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// Useful for fetching a school's announcements
announcementSchema.index({
    school: 1,
    visibility: 1,
    status: 1,
    publishedAt: -1
});

module.exports = mongoose.model('Announcement', announcementSchema);