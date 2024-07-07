# Steps to start

1st terminal
```
cd server
npm install 
npm run dev 
```

2nd terminal
```
cd client
npm install 
npm run dev 
```




## Setup I did so you can look into what packages I have used

### Server

```
npm init -y
npm i bcryptjs cloudinary cors crypto dotenv express jsonwebtoken mongodb mongoose multer multer-storage-cloudinary nodemon stripe
```

### Client

```
npm create vite@latest . -- --template react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i react-router-dom react-icons notistack axios jsonwebtoken @tailwindcss/typography daisyui
npm i react-image-crop --save
```
