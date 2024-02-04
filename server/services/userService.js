const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = 'm0sTD@ng3rouSPa$$worD1995';
const tokenBlackList = new Set();

async function register(email, password, firstName, lastName, phoneNumber) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Email already used')
    }

    const user = await User.create({
        email,
        hashedPassword: await bcrypt.hash(password, 10),
        firstName,
        lastName,
        phoneNumber
    });

    return createToken(user);

};

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect email or password');
    };

    const token = createToken(user);

    tokenBlackList.delete(token);

    return token;
};

async function logout(token) {
    tokenBlackList.add(token);
};

function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email
    };

    return {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        accessToken: jwt.sign(payload, secret),
    }
};

function parseToken(token) {
    if (tokenBlackList.has(token)) {
        throw new Error('Token is blacklisted');
    }

    return jwt.verify(token, secret);
}

async function getUserById(id) {
    return User.findById(id);
}

async function deleteUserById(id) {
    return User.findByIdAndDelete(id);
}

module.exports = {
    register,
    login,
    logout,
    parseToken,
    getUserById,
    deleteUserById,
}