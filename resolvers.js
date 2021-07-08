const db = require('./db')
const Query = {
    // resolver function with no parameters and returning string
    greeting: () => {
        return 'hello from TutorialsPoint !!!'
    },
    // resolver function with no parameters and returning list
    students: () => db.students.list(),
    // resolver function with arguments and returning object
    studentById: (root, args, context, info) => {
        // args will contain parameter passed in query
        return db.students.get(args.id);
    },
    sayHello: (root, args, context, info) => {
        return `Hi ${args.name} GraphQL server says Hello to you!!`
    },
    setFavouriteColor: (root, args) => {
        return 'Your Fav Color is: ' + args.color;
    },
    greetingWithAuth: (root, args, context, info) => {
        // check if the context.user is null
        if (!context.user) {
            throw new Error('Unauthorized');
        }
        return 'Welcome back: ' + context.user.firstName;
    }
}
const Student = {
  fullName: (root, args, content, info) => {
      return root.firstName + " : " + root.lastName
  },
  college: (root) => {
      return db.colleges.get(root.collegeId)
  }
}
const Mutation = {
    createStudent: (root, args, context, info) => {
        return db.students.create({collegeId: args.collegeId,
            firstName: args.firstName,
            lastName: args.lastName
        })
    },
    // new resolver function
    addStudent_returns_object: (root, args, context, info) => {
        const id = db.students.create({
            collegeId: args.collegeId,
            firstName: args.firstName,
            lastName: args.lastName
        })
        return db.students.get(id)
    },
    signUp: (root, args, context, info) => {
        const {email, firstName, password} = args.input;
        const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail = emailExpression.test(String(email).toLowerCase())
        if (!isValidEmail)
            throw new Error("Email not in proper format")
        if (firstName.length > 15)
            throw new Error("firstName should be less than 15 characters")
        return "success";
    }
}
module.exports = {Query, Student, Mutation}