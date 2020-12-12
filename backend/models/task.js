module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        desc: DataTypes.STRING,
        done: DataTypes.BOOLEAN
    })

    return Task
}