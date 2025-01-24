import { ListTablesCommand,DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand,PutCommand,DynamoDBDocumentClient,ScanCommand,DeleteCommand } from "@aws-sdk/lib-dynamodb";
import  crypto from 'crypto'
const client=new DynamoDBClient({
    region:'Asia Pacific (Mumbai)'
})
const docClient=DynamoDBClient.from(client)

export const fetchTasks=async()=>{
    const command=new ScanCommand({
        ExpressionAttributeNames:{"#name":"name"},
        ProjectionExpression:"id,#name,completed",
        TableName:"Tasks"
    })
    const response=await docClient.send(command)
    return response;
}
export const createTasks=async(name,completed)=>{
    const uuid=crypto.randomUUID()
    const command=new PutCommand({
        TableName:"Tasks",
        item:{
            id:uuid,
            name,
            completed
        }
    })
  const response=await docClient.send(command)
}

export const updateTasks=async({id,name,completed})=>{
    const command=new UpdateCommand({
        TableName:"Tasks",
        key:{
            id
        },
        ExpressionAttributeNames:{
            "#name":"name"

        },
        UpdateExpression:"set #name= :n completed= :c",
        ExpressionAttributeValues:{
            ":n":name,
            ":c":completed
        },
        ReturnValues:"ALL_NEW"


    })
    const response=await docClient.send(command)
    return response
}

export const deleteTasks=async(id)=>{
    const command= new DeleteCommand({
        TableName:"Tasks",
        key:{
            id
        }
    })
    const response=await docClient.send(command)
  
}