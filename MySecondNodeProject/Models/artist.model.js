import { sequelize } from "../Config/db.sequelize.js";
import { Sequelize, DataTypes, Model } from "sequelize"; //DataType skal være med stort d og t

class ArtistModel extends Model {

}

ArtistModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Untitled'
    }
}, {
    //hvis man laver ændringer i dette skal man huske at slette tabellen da den laver en ny
    sequelize,
    modelName: 'artist',
    //dette gør at tablensnavn forbliver det der står i modelName (ellers laver den det i fleretal)
    freezeTableName: true,
    //dette gør at den laver underscored isteder for camelCase som den gør som standart
    underscored: true
    //dette laver om på navnet
    //createdAt: 'created'
    //dette gør at den ikke kommer med
    //updatedAt: false
})

export default ArtistModel;
