/*
1. Create a band of your choice.
2. Log the newly created band. (Just that band, not all bands)
3. Create another band of your choice.
4. Query all bands, and log them all
5. Create the 3rd band of your choice.
6. Log the newly created 3rd band. (Just that band, not all bands)
7. Rename the first band
8. Log the first band with the updated name. 
9. Remove the second band you created.
10. Query all bands, and log them all
11. Try to create a band with bad input parameters to make sure it throws errors.
12. Try to remove a band that does not exist to make sure it throws errors.
13. Try to rename a band that does not exist to make sure it throws errors.
14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a band by ID that does not exist to make sure it throws errors.   */
import {create,getAll,get,remove,rename} from "./data/bands.js";
import {dbConnection,closeConnection} from "./config/mongoConnection.js"
//lets drop the database each time this is run
   
    async function main(){
        const db = await dbConnection();
        await db.dropDatabase();
        let pinkFloyd=undefined
        let Beatles=undefined
        let Link=undefined
        let t1 = undefined
   try 
    {
        pinkFloyd=await create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
        //console.log(pinkFloyd);
    } 
    catch (e) 
    {
        console.log(e);
    }
    try 
    {
         const display=await get(pinkFloyd._id);
         console.log(display);
    } 
    catch (e) 
    {
        console.log(e);
    }
    try 
    {
        Beatles=await create("The Beatles", ["Rock", "Pop", "Psychedelia"],"http://www.thebeatles.com","Parlophone",["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],1960);
    } 
    catch (e) 
    {
        console.log(e);
    }
    try
    {
        const display=await getAll()
        console.log(display);
    }
    catch(e)
    {
        console.log(e);
    }
   
    try
    {
        Link=await create("Linkin Park",["Alternative Rock", "Pop Rock", "Alternative Metal"],"http://www.linkinpark.com","Warner",["Chester Bennington", "Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn"],1996)
    }
    catch(e)
    {
        console.log(e);
    }
    try 
    {
         const display=await get(Link._id);
         console.log(display);
    } 
    catch (e) 
    {
        console.log(e);
    }
    try
    {
        const display=await rename(pinkFloyd._id,"PINKFLOYD")   
    }
    catch(e)
    {
        console.log(e);
    }
    try 
    {
         const display=await get(pinkFloyd._id);
         console.log(display);
    } 
    catch (e) 
    {
        console.log(e);
    }
    try 
    {
         const display=await remove(Beatles._id.toString());
         console.log(display);
    } 
    catch (e) 
    {
        console.log(e);
    }
   try 
    {
        const display=await getAll(); 
        console.log(display)
    } 
    catch (e) 
    {
        console.log(e);
    }
    try
    {
        t1=await create("Aishwarya",["Rap","Rock"],"http://www.Aish.com","Patel",["A","B","c"],1999)
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        const display=await remove("507f1f77bcf86cd799439013")
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        const display=await rename("507f1f77bcf86cd799439013","Aish")
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        const display=await rename(Link._id,9);
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        const display=await get("507f1f77bcf86cd799439013");
        console.log(display);
    }
    catch(e)
    {
        console.log(e);
    }
    
    await closeConnection();
}
main();
