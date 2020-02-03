const crypto = require('crypto');
const User = require('../../models/User');
const sendEmail = require('../../util/sendEmail');

exports.createUser = async ({ userInput }) => {
  let { name, email, password, confirmPassword } = userInput;
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }
  const user = await User.create({ name, email, password });
  return { ...user._doc, password: null };
};

exports.login = async ({ email, password }, req) => {
  //validate email and password
  if (!email || !password) {
    throw new Error('Please provide email and password!');
  }
  //check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid credentials!');
  }
  //check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials!!');
  }

  //create token
  const token = user.getSignedJwtToken();

  return {
    userId: user.id,
    token: token
  };
};

exports.viewProfile = async (args, req) => {
  if (!req.isAuth) {
    throw new Error('Not authenticated');
  }
  let { email } = req.user;
  const user = await User.findOne({ email }).select('+password');
  return { ...user._doc, password: null };
};

exports.forgotPassword = async ({ email }, req) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw Error(`User doesn't exists with the given email:${email}`);
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    return 'Email Sent!';
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    throw new Error('Email Sending Failed!!');
  }
};

exports.updatePassword = async ({ password, confirmPassword, token }, req) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error('Invalid Token');
  }
  if (password !== confirmPassword) {
    throw new Error('passwords do not match');
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  return 'Password reset successful';
};

exports.updateUser = async ({ name, email }, req) => {
  if (!req.isAuth) {
    throw new Error('Not authenticated');
  }
  const fieldsToUpdate = {
    name,
    email
  };
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });
  return { ...user._doc, password: null };
};
