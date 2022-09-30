import sgMail from '@sendgrid/mail';
import jwt from "jsonwebtoken";
import {emailPromise} from './emailPromise';
import {IUser} from '../../interface';


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendForgotPasswordMail = async (user: IUser) => {
    try {
        const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '20m'});
        const html = `<h3>Please click on the link below to recover your password</h3><br/>
			<a href="http://localhost:3000/reset-password/${token}">Click Here</a>`
        const subject = "Recover Password"
        await emailPromise({token, email: user.email, html, subject})
        return true
    } catch (e) {
        return false
    }
};

export const sendPlaceOrderMail = async (email: string) => {

    try {
        const html = `<h3>Order Placed successfully</h3>`
        const subject = "Thank for choosing scrub"
        await emailPromise({email, html, subject})
        return true
    } catch (e) {
        return false
    }
};

export const sendAdminPlaceOrderMail = async (email: string, orderId: string) => {

    try {
        const html = `
		<div>
		    <h3>An order has been placed</h3>
		    <p>Email: ${email}</p>
		    <p>Order Id: ${orderId}</p>
		</div>
		`
        const subject = "An order has been placed"
        await emailPromise({email: "obaid3035@gmail.com", html, subject})
        return true
    } catch (e) {
        return false
    }
};


export const sendPasswordMail = async (password: string, email: string) => {
    try {
        const html = `<h3>This is you'r password</h3><br/>
			<p>${password}</p>`
        const subject = "New Password"
        await emailPromise({email, html, subject})
        return true
    } catch (e) {
        return false
    }
};


export const sendGiftCardCodeMail = async (email: string, code: string) => {
    try {
        const html = `<h3>This is you'r E-Gift code</h3><br/>
			<p>${code}</p>`
        const subject = "Gift Card"
        await emailPromise({email, html, subject})
        return true
    } catch (e) {
        return false
    }
};

export const sendAdminGiftCardCodeMail = async (email: string) => {
    try {
        const html = `<h3>Gift Card has been bought by ${email}</h3>`
        const subject = "Gift Card has been bought"
        await emailPromise({email, html, subject})
        return true
    } catch (e) {
        return false
    }
};


