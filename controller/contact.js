const Contact = require('../model/Contact')

exports.getContacts = async (ctx) => {
  var pageOptions = {
    page: parseInt(ctx.query.page) || 0,
    limit: parseInt(ctx.query.limit) || 10,
    name: ctx.query.name || "",
    lastName: ctx.query.lastName || ""
  };

  let contacts = null;

  if(pageOptions.name !== ""){
    contacts = await Contact.find()
    .where('name').equals(pageOptions.name)
    .skip(pageOptions.page*pageOptions.limit)
    .limit(pageOptions.limit)
    .exec(function (err, doc) {
        if(err) { throw new Error('Contacts failed to get.') };
        console.log(doc);
    })
  }else if (pageOptions.lastName !== "") {
    contacts = await Contact.find()
    .where('lastName').equals(pageOptions.lastName)
    .skip(pageOptions.page*pageOptions.limit)
    .limit(pageOptions.limit)
    .exec(function (err, doc) {
        if(err) { throw new Error('Contacts failed to get.') };
        console.log(doc);
    })
  } else {
    contacts = await Contact.find()
    .skip(pageOptions.page*pageOptions.limit)
    .limit(pageOptions.limit)
    .exec(function (err, doc) {
        if(err) { throw new Error('Contacts failed to get.') };
        console.log(doc);
    })
  }

	if (!contacts) {
		throw new Error("There was an error retrieving your contacts.")
	} else {
		ctx.body = contacts
	}
}

exports.createContact = async (ctx) => {
	const result = await Contact.create({
    name: ctx.request.body.name,
    lastName: ctx.request.body.lastName,
    company: ctx.request.body.company,
    phoneNumber: ctx.request.body.phoneNumber,
    email: ctx.request.body.email
	})
	if (!result) {
		throw new Error('Contact failed to create.')
	} else {
    ctx.status = 201
		ctx.body = {message: 'Contact created!', data: result}
	}
}

exports.updateContact = async (ctx) => {
	const searchByName = {email: ctx.request.body.email}
	const update = {name: ctx.request.body.name,
    lastName: ctx.request.body.lastName,
    company: ctx.request.body.company,
    phoneNumber: ctx.request.body.phoneNumber,
    email: ctx.request.body.email}
	const result = await Contact.findOneAndUpdate(searchByName, update)
	if (!result) {
		throw new Error('Contact failed to update.')
	} else {
    console.log(result)
    ctx.status = 202
		ctx.body = {message: 'Contact updated!', data: result}
	}
}

exports.deleteContact = async (ctx) => {
	const result = await Contact.findOneAndRemove({email: ctx.request.body.email})
	if (!result) {
		throw new Error('Contact failed to delete.')
	} else {
		ctx.status = 202
		ctx.body = {message: 'success!'}
	}
}
