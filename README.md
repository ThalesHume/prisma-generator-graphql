# prisma-generator-graphql


This prisma generator is used to generate *.graphql file.

```prisma
generator graphql_gql {
    provider = "prisma-generator-graphql"
    output = "../src/generated/graphql"
    allInOnePath  = "folder1- folder2-...-filename"
}
```
Above code will generate filename.graphql in path: NodePathResolve(schemapath, outputpath, folder1, folder2, ..., filename.graphql)  

**Other config is developing, not use now!**

If you want change the generated field type, follow this:

```prisma
model mymodel{
    ///docs...
    ///@Type:HandleMethod
    handleMethod      String
}
```
The generated result is:

```graphql
type mymodel{
    "docs..."
    handleMethod      HandleMethod
}
```
Before you user this definition in nexsjs(for example), you add custom Enum type in my.graphql:
```graphql
enum HandleMethod{
    A,
    B,
    C
}
```
Set nextjs module as follows
```typescript
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      path: "/graphql",
      typePaths:["./**/*.graphql"],
      driver: ApolloDriver,
      playground: true,
      definitions:{
        path: "./src/generated/graphql.ts",
        outputAs: 'interface'
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService,AppResolver],
})
export class AppModule {}
```
The schema is merge filename.graphql and my.graphql fine.  
ps: I use this way for sqlite not support prisma Enum