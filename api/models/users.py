from database.database import Database


class Users():
    def __init__(self):
        self.database_cls = Database()
        self.database_cls.create_tables()

    def add_user(self, name, email, password, rights):
        self.name = name
        self.email = email
        self.password = password
        self.rights = rights

        insert_user = "INSERT INTO users(name, email, password, rights) VALUES(%s, %s, %s, %s)"

        details = (name, email, password, rights)

        self.database_cls.sql_insert(insert_user, details)

    def login_user(self, email):

        user_logged = "SELECT * FROM users WHERE email = '{0}';".format(email)

        return self.database_cls.sql_fetch_one(user_logged)

    def get_all_users(self):

        all_users = "SELECT user_id, name, email, rights FROM users"

        return self.database_cls.sql_fetch_all(all_users)

    def get_user_by_email(self, email):
        get_user = "SELECT user_id, name, email, rights FROM users WHERE email = '{0}';".format(
            email)

        return self.database_cls.sql_fetch_one(get_user)

    def get_user_by_id(self, user_id):
        get_user = "SELECT user_id, name, email, rights FROM users WHERE user_id = {0};".format(
            user_id)

        return self.database_cls.sql_fetch_one(get_user)

    def delete_user_by_email(self, email):
        delete_user = "DELETE FROM users WHERE email = '{0}'; ".format(
            email)
        return self.database_cls.execute_query(delete_user)

    def edit_user_rights(self, user_id, rights):
        edit_user = """UPDATE users SET rights = {1} WHERE user_id = {0} """.format(
            user_id, rights)
        return self.database_cls.execute_query(edit_user)

    def check_token(self, jti):
        ex_tokens = "SELECT * FROM tokens WHERE ex_tokens = '{0}'".format(jti)
        return self.database_cls.sql_fetch_all(ex_tokens)

    def add_token(self, jti):
        add_token = "INSERT INTO tokens(ex_tokens) VALUES(%s)"
        details = (jti,)
        return self.database_cls.sql_insert(add_token, details)
