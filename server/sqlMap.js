
var sqlMap = {
    user: { 
        add: 'insert into user( username, password,problem,answer) values ( ?,?,?,?)',
        select_problem:'SELECT * from user where problem = ?',
        select_answer:'SELECT * from user where answer = ?',
        update:"update user set password= ? where username=?",
        select_name: 'SELECT * from user where username = ?',    
        select: 'SELECT * from user where username = ? and password=?'      
    },
    blog: {
        add: 'insert into blog(title, content, type, author) values ( ?, ?, ?, ?)',
        list: `select id, title, type, author from blog limit ?, ?`,
        total: `select count(*) as total from blog`,
        detail:`select title,content,type,author,id from blog where id=?`,
        delete:`delete from blog where id=?`,
        update:`update blog set title=?,content=?,type=?,author=? where id=? `
    },
    comment: {
        add: 'insert into comments(author, content,blogId) values ( ?, ?, ?)',
        list: `select id, author, content from comments where blogId=? limit ?, ?`,
        total: `select count(*) as total from comments where blogId=?`,
        delete:`delete from comments where id=?`
    }
}
module.exports = sqlMap;