## Server
1. Entrar na pasta server
2. Executar ```$ yarn```
3. Para testar/rodar ```$ yarn dev```

### AWS e Banco de dados
É necessário banco mongodb e uma conta na AWS
 - O mongodb pode ser utilizado via docker (local) ou via Atlas (Online), os passos a seguir utilizam o tier gratuito do Atlas.
1. Após criar uma org e um projeto no Atlas, crie um cluster
2. Com o cluster iniciado vá em _Network Access -> Add Ip Address -> Allow Access From Anywhere -> Confirm_
3. Na tela de Clusters clique em _Connect_:
![Imgur](https://i.imgur.com/Ougy41b.png)
4. Crie um usuário, guarde a senha:
![Imgur](https://i.imgur.com/f5v3Yok.png)
5. Em _Choose a connection method_, selecione _Connect Your Application_, copie a Connection String que irá aparecer e cole no arquivo .env
6. Lembre-se de subtituir \<password> pela senha do usuário
 
 - Para configurar o bucket do S3
 1. Entre no dashboard da AWS e selecione o S3
 2. Selecione 'Create bucket' escolha um nome e selecione 'Create Bucket' novamente.
 3. Selecione seu nome de usuário no menu superior e clique em 'My Security Credentials'
 4. Em 'Access Keys' selecione 'Create new Access Key' e utilize os valores no arquivo .env, assim como o nome do bucket criado
 ![Imgur](https://i.imgur.com/4XTjDcL.png)
    > O AWS S3 possui um tier gratuito para contas novas, durante 12 meses. Existem alternativas como o Digital Ocean Spaces, a configuração é similar, basta ler a documentação. ```

#### JWT Secret

Para testes/local pode utilizar qualquer string, utilize um gerador de senhas de 10 caracteres com letras e numeros.