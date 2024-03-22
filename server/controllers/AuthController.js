//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//IMPORT THINGS ON THE TOP
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const generator = require("generate-password");
const nodemailer = require('nodemailer');
const dayjs = require("dayjs");
const fs = require('fs');
const ejs = require('ejs');
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const { body, validationResult, check } = require("express-validator");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Helper
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const helper = require("../helper/helper.js");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Model
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const UserModel = require("../models/Users");
const { generateJwt } = require("../helper/helper.js");
const sendMail = require("../middleware/sendMail.js");
const sendResetMail = require("../middleware/sendResetMail.js");
const ResetToken = require("../models/ResetToken.js");
const UsersPersonalDetail = require("../models/UsersPersonalDetail.js");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Route OTP
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.otp = async function (req, res) {
  let resData = {
    status: false,
    data: {},
    message: "",
  };
  try {
    //+++++++++++++++++++++++++++++++++++++++++++++++++++
    let phone_number = parseInt(req.body.phone_number, 10) || "";
    let phone_no_country_code = "+91";
    //+++++++++++++++++++++++++++++++++++++++++++++++++++
    if (!phone_number) {
      resData.message = "Please Enter Phone Number";
      return res.status(200).json(resData);
    }
    if (phone_number.toString().length > 10) {
      resData.message = "Phone Number Cant Be More Then 10 Character";
      return res.status(200).json(resData);
    }
    if (!phone_no_country_code) {
      resData.message = "Please Enter Phone Number Country Code";
      return res.status(200).json(resData);
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++
    let otp = helper.generateOTP(4);
    //+++++++++++++++++++++++++++++++++++++++++++++++++++
    const return_q_promis = UserModel.count({
      where: {
        phone_no: phone_number,
      },
    });
    //+++++++++++++++++++++++++++++++++++++++++
    return_q_promis.then((r_obj) => {
      if (r_obj == 0) {
        //+++++++++++++++++++++++++++++++++++++++++
        resData.status = true;
        resData.message = "The Number Is not Register";
        return res.status(200).json(resData);
      } else {
        //+++++++++++++++++++++++++++++++++++++++++
        const return_q_promis_2 = UserModel.findAndCountAll({
          where: {
            phone_no: phone_number,
          },
        });
        //+++++++++++++++++++++++++++++++++++++++++
        return_q_promis_2
          .then((r_obj) => {
            //+++++++++++++++++++++++++++++++++++++++++
            let main_data = {
              password: helper.encryptUsingAES256(otp),
            };
            //+++++++++++++++++++++++++++++++++++++++++
            UserModel.update(main_data, {
              where: {
                id: r_obj.rows[0].id,
              },
            })
              .then((obj) => {
                //+++++++++++++++++++++++++++++++++++++++++
                //resData.data.data_processing = r_obj.rows;
                resData.data.otp = otp;
                //+++++++++++++++++++++++++++++++++++++++++
                resData.status = true;
                resData.message = "OTP Send To Your Register Phone Number";
                return res.status(200).json(resData);
              })
              .catch((obj_error) => {
                //+++++++++++++++++++++++++++++++++++++++++
                resData.status = false;
                resData.data.data_processing = obj_error;
                resData.message =
                  "Sorry!! Something Went Wrong. Please Try After Sometime.";
                return res.status(200).json(resData);
              });
          })
          .catch((obj_error) => {
            //+++++++++++++++++++++++++++++++++++++++++
            resData.status = false;
            resData.data.data_processing = obj_error;
            resData.message =
              "Sorry!! Something Went Wrong. Please Try After Sometime.";
            return res.status(200).json(resData);
          });
      }
    });
    //+++++++++++++++++++++++++++++++++++++++++
  } catch (e) {
    resData.status = false;
    resData.message = "Error!!";
    resData.data = e;
    res.status(601).json(resData);
  }
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Route Resnd OTP
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.resend_opt = async function (req, res) {
  let resData = {
    status: false,
    data: {},
    message: "",
  };
  try {
    //+++++++++++++++++++++++++++++++++++++++++++++++++++
    let phone_number = parseInt(req.body.phone_number, 10) || "";
    //+++++++++++++++++++++++++++++++++++++++++++++++++++
    if (!phone_number) {
      resData.message = "Please Enter Phone Number";
      return res.status(200).json(resData);
    }
    if (phone_number.toString().length > 10) {
      resData.message = "Phone Number Cant Be More Then 10 Character";
      return res.status(200).json(resData);
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++
    let otp = helper.generateOTP(4);
    //+++++++++++++++++++++++++++++++++++++++++++++++++++
    const return_q_promis = UserModel.count({
      where: {
        phone_no: phone_number,
      },
    });
    //+++++++++++++++++++++++++++++++++++++++++
    return_q_promis.then((r_obj) => {
      if (r_obj == 1) {
        //+++++++++++++++++++++++++++++++++++++++++
        let main_data = {
          password: helper.encryptUsingAES256(otp),
        };
        UserModel.update(main_data, {
          where: {
            phone_no: phone_number,
          },
        })
          .then((obj) => {
            //+++++++++++++++++++++++++++++++++++++++++
            resData.data.otp = otp;
            //resData.data.data_processing = obj;
            //+++++++++++++++++++++++++++++++++++++++++
            resData.status = true;
            resData.message = "New OTP Send To Your Register Phone Number";
            return res.status(200).json(resData);
          })
          .catch((obj_error) => {
            //+++++++++++++++++++++++++++++++++++++++++
            resData.status = false;
            resData.data.data_processing = obj_error;
            resData.message =
              "Sorry!! Something Went Wrong. Please Try After Sometime.";
            return res.status(200).json(resData);
          });
      } else {
        resData.status = false;
        resData.message = "Not Valied User";
        return res.status(200).json(resData);
      }
    });
    //+++++++++++++++++++++++++++++++++++++++++
  } catch (e) {
    resData.status = false;
    resData.message = "Error!!";
    resData.data = e;
    res.status(601).json(resData);
  }
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Route Login
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.login = async function (req, res) {

  const { emp_id, password } = req.body;
  var res_data = {
    message: null,
    status: 400
  };
  // Check if user exists
  var check = false;
  var user;
  try {
    user = await UserModel.findOne({ where: { emp_id } });
    check = true;
  } catch (error) {
    check = false;
  }
  if (check) {
    if (!user) {
      res_data.message = "User Not Found !";
    } else {
      check = await bcrypt.compare(password, user.password);
      console.log(check);
      if (check) {
        const payload = {
          user_id: user.id,
          emp_id: user.emp_id,
          first_name: user.first_name,
          last_name: user.last_name,
          gender: user.gender,
          dob: user.dob,
          email: user.email,
          user_image: user.user_image,
          designation: user.designation,
          role: user.role,
          date_of_joining: user.date_of_joining,
          office: user.label,
          status: user.status,
          phone_no: user.contact_no
        };
        res_data.message = helper.generateJwt(payload);
        res_data.status = 200;
        return res.status(200).json({ status: res_data.status, token: res_data.message });
      } else {
        res_data.message = "User Credentials Not Macthed ";
      }
    }
  } else {
    res_data.message = "Server Error Please Try Later ";
  }
  return res.status(200).json({ status: res_data.status, message: res_data.message });
  // // Check if password matches
  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   return res.status(400).json({ message: "Invalid credentials" });
  // }

  // // Find the associated personal details
  // const personalDetails = await UsersPersonalDetail.findOne({
  //   where: { user_id: user.id },
  // });

  // if (!personalDetails) {
  //   return res.status(404).json({ message: "Server error" });
  // }

  // // Create and send JWT token
  // const payload = {
  //   user_id: user.id,
  //   emp_id: user.emp_id,
  //   first_name: user.first_name,
  //   last_name: user.last_name,
  //   gender: user.gender,
  //   dob: user.dob,
  //   email: user.email,
  //   user_image: user.user_image,
  //   designation: user.designation,
  //   role: user.role,
  //   date_of_joining: user.date_of_joining,
  //   office: user.label,
  //   status: user.status,
  //   phone_no: personalDetails.phone_no,
  // };

  // helper.generateJwt(payload);

  // res.status(200).json({ token: helper.generateJwt(payload), user: payload });

};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Route Register
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.register = async function (req, res) {
  var check = false;
  const res_data = {
    message: "",
    status: 400
  };
  const form_data = [
    req.body.first_name,
    req.body.last_name,
    req.body.dob,
    req.body.gender,
    req.body.emp_id,
    req.body.designation,
    req.body.label,
    req.body.date_of_joining,
    req.body.paid_leaves,
    req.body.email,
    req.body.phoneNumber,
    req.body.presentAddress,
    req.body.permanentAddress
  ];
  const error_message = [
    "first_name",
    "last_name",
    "dob",
    "gender",
    "emp_id",
    "designation",
    "label",
    "date_of_joining",
    "paid_leaves",
    "email",
    "contact_no",
    "present_address",
    "permanent_address"
  ];
  var count_input = 0;
  for (var i = 0; i < form_data.length; i++) {
    if (form_data[i] === "" || (typeof (form_data[i]) === "number" && form_data[i] == 0)) {
      check = false;
      res_data.message = error_message[count_input] + " Field is Required !";
      break;
    } else {
      check = true;
    }
    count_input++;
  }
  if ((check) && (req.body.phoneNumber.toString().length != 10)) {
    check = false;
    res_data.message = "Enter A Valid Phone Number";
  }
  if (!check) {
    return res.status(200).json(res_data);
  }
  var dob = convertDate(form_data[2]);
  var joining_date = convertDate(form_data[7]);
  const user = await UserModel.findOne({ where: { email: req.body.email } });
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);


  var lowercase = "abcdefghijklmnopqrstuvwxyz"
  var uppercase = lowercase.toUpperCase();
  var numbers = "1234567890";
  var password = "";
  for (var i = 0; i < 2; i++) {
    password += uppercase[Math.floor(Math.random() * (uppercase.length - 1))] + lowercase[Math.floor(Math.random() * (lowercase.length - 1))] + numbers[Math.floor(Math.random() * (numbers.length - 1))];
  }
  const now = new Date(); // Current date

  if (!user) {
    const check_emp = await UserModel.findOne({
      where: {
        emp_id: req.body.emp_id
      }
    });
    if (!check_emp) {
      // const dateOfJoining = new Date(joining_date);
      // const millisecondsInDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

      // const daysRemaining =
      //   Math.floor(
      //     (new Date(dateOfJoining.getFullYear(), 11, 31) - dateOfJoining) /
      //     millisecondsInDay
      //   ) + 1;
      // const daysInYear = 365; // Number of days in a non-leap year
      // const proRataLeaveEntitlement = Math.round(
      //   (daysRemaining / daysInYear) * 12
      // );

      const userObject = {
        emp_id: req.body.emp_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        contact_no: req.body.phoneNumber,
        designation: req.body.designation,
        // address: req.body.address,
        perment_address: req.body.permanentAddress,
        current_address: req.body.presentAddress,
        password: bcrypt.hashSync(password, salt),
        status: "Active",
        role: 0,
        dob: dob,
        date_of_joining: joining_date,
        label: req.body.label,
        gender: req.body.gender,
        // paid_leaves: proRataLeaveEntitlement, // Use the calculated pro rata value
        paid_leaves: req.body.paid_leaves, // Use the calculated pro rata value
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      };

      try {
        const newUser = await UserModel.create(userObject);
        res_data.message = "Registration Completed ";
        res_data.status = 200;
        check = true;
      } catch (error) {
        check = false;
        res_data.message = "Server Error Please Try Later ";
      }
      if (check) {
        // await sendMail(
        //   newUser.first_name,
        //   newUser.emp_id,
        //   newUser.email,
        //   password
        // );
        await sedMailer(password, req.body.emp_id, req.body.first_name, req.body.email);
        return await res.status(200).json(res_data);
      } else {
        return await res.status(200).json(res_data);
      }
    } else {
      res_data.message = "User Employee ID Already Exists ";
      return await res.status(200).json(res_data);
    }

  } else {
    res_data.message = "User Email ID Already Exists ";
    return await res.status(200).json(res_data);
  }
};
const convertDate = (date) => {
  var d = new Date(date),
    month = d.getMonth() + 1,
    day = d.getDate(),
    year = d.getFullYear();
  return month + "-" + day + "-" + year;

}
const sedMailer = async (password, emp_id, first_name, email) => {
  let sender = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secureConnection: true,
    // tls: {
    //   maxVersion: 'TLSv1.3',
    //   minVersion: 'TLSv1.2',
    //   ciphers: 'TLS_AES_128_GCM_SHA256',
    // },
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD
    },
    secureProtocol: 'TLSv1_2_method'
    // tls: {
    //   rejectUnauthorized: true
    // }
  });
  const templateString = fs.readFileSync('./public/registration_mail.ejs', 'utf-8');

  // Dynamic data
  const data = {
    first_name: first_name,
    emp_id: emp_id,
    password: password
  };
  const html = ejs.render(templateString, data);
  console.log(email);
  let mail = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: 'Registration Mail From Gratia Technology',
    html: html,

  };

  await sender.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent successfully: ' +
        info.response);
    }
  });
}

module.exports.update = async function (req, res) {
  var check = false;
  try {
    const userObject = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      contact_no: req.body.contact_no,
      designation: req.body.designation,
    };
    var user = await UserModel.findOne({
      where: {
        id: req.body.id
      }
    });
    if (!user) {
      return res.status(200).json({
        status: 400,
        message: "user details not found !"
      });
    }
    // Update user information in UserModel
    await UserModel.update(userObject, {
      where: { id: req.body.id },
    });
    check = true;
  } catch (error) {
    check = false;
  }
  if (check) {
    var user;
    try {
      user = await UserModel.findOne({
        where: {
          id: req.body.id
        }
      });
      check = true;
    } catch (err) {
      check = false;
    }
    if (check) {
      if (user) {
        return res.status(200).json({
          status: 200,
          user: user
        });
      } else {
        return res.status(200).json({
          status: 400,
          message: "No data found after updated "
        })
      }
    } else {
      return res.status(200).json({
        status: 400,
        message: "server error in retriving new data "
      });
    }
  } else {
    return res.status(200).json({
      status: 400,
      message: "server error please try later !"
    });
  }



  // Update phone number in PersonalDetailsModel
  // await UsersPersonalDetail.update(
  //   { phone_no: req.body.phone_no },
  //   { where: { user_id: req.body.id } }
  // );

  // const updatedUser = await UserModel.findOne({ where: { id: req.body.id } });
  // const personalDetails = await UsersPersonalDetail.findOne({
  //   where: { user_id: req.body.id },
  // });

};

module.exports.profileImage = async function (req, res, err) {
  try {
    const update = {
      user_image: req.file.filename,
    };
    created_user = await UserModel.update(update, {
      where: { emp_id: req.body.emp_id },
    });
    res.status(200).json({
      data: await UserModel.findOne({ where: { emp_id: req.body.emp_id } }),
    });
  } catch (error) {
    res.status(422).json({
      error: error.message,
    });
  }
};

module.exports.user_image = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      attributes: ["user_image"],
      where: { emp_id: req.body.emp_id },
    });
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports.change_password = async (req, res) => {
  try {
    const password = req.body.password;
    if (!password) {
      return res.status(422).json({
        error: "enter password",
      });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    const update = {
      password: bcrypt.hashSync(password, salt),
    };
    created_user = await UserModel.update(update, {
      where: { emp_id: req.body.emp_id },
    });
    res.status(200).json({
      message: "Password Changed Successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Route Reset Password
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports.resetPassword = async (req, res) => {
  function generateResetToken() {
    const tokenLength = 16;
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    for (let i = 0; i < tokenLength; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  }
  const { email } = req.body;
  try {
    // Check if the user exists
    const user = await UserModel.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Generate a reset token and set its expiration time to 15 mins from now
    const resetToken = generateResetToken();
    const expiresAt = new Date(Date.now() + 900000); // 15 mins in milliseconds

    // Save the reset token in the database
    await ResetToken.create({
      token: resetToken,
      user_id: user.id,
      expires_at: expiresAt,
    });
    await sendResetMail(email, user.first_name, resetToken);
    // Return success response
    res
      .status(200)
      .json({ message: "A password reset link has been sent to your email" });
  } catch (error) {
    console.error("Error generating reset token or sending email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Route Update Password
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports.updatePasswordusingToken = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Find the reset token in the database
    const resetTokenEntry = await ResetToken.findOne({ where: { token } });
    if (!resetTokenEntry) {
      return res.status(404).json({ error: "Invalid reset token" });
    }

    // Check if the reset token has expired
    if (resetTokenEntry.expiresAt < new Date()) {
      return res.status(400).json({ error: "Reset token has expired" });
    }

    // Find the user based on the user_id associated with the reset token
    const user = await UserModel.findOne({
      where: { id: resetTokenEntry.user_id },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Delete the used reset token from the database
    await resetTokenEntry.destroy();

    // Return success response
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
