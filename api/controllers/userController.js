//Testes 
import { 
  createUser, 
  getUsers, 
  getUserById, 
  getUserByEmail,
  updateUser,
  deleteUser,
  searchUsers
} from "../services/userService.js";

/*
Necessarios pro controle de erro

import passport from "passport";
import bcrypt from "bcryptjs";
*/

export const addUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await updateUser(id, updates);
    if (!updatedUser || updatedUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const users = await searchUsers(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Controle de erro 
/*
post("/register", (req, res) => {
  const { cnpj, email, password } = req.body;

  let errors = [];

  if (!cnpj || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("auth/register", { errors, username, password, password2 });
  } else {
    User.findOne({ where: { username: username } }).then((user) => {
      if (user) {
        errors.push({ msg: "Username already exists" });

        res.render("auth/register", { errors, username, password, password2 });
      } else {
        const newUser = new User({
          username,

          password,
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;

            newUser

              .save()

              .then((user) => {
                req.flash(
                  "success_msg",

                  "You are now registered and can log in"
                );

                res.redirect("/login");
              })

              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

// Login Handle

post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",

    failureRedirect: "/login",

    failureFlash: true,
  })(req, res, next);
});

// Logout Handle

get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);

      return;
    }

    req.flash("success_msg", "You are logged out");

    res.redirect("/login");
  });
});


*/ 