import {createSlice} from "@reduxjs/toolkit";
import {db, storage} from "../firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {addDoc, collection} from "firebase/firestore";

const AddProjSlice = createSlice({
  name: "projuct",
  initialState: {
    projucts: [],
    loading: false,
  },
  reducers: {
    setProjucts: (state, action) => {
      const collStorage = ref(storage, `images/${action.payload.picture.name}`);
      const uploadStorage = uploadBytesResumable(
        collStorage,
        action.payload.picture
      );
      uploadStorage.on(
        "state_changed",
        (snapshot) => {
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          // console.log(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadStorage.snapshot.ref).then((downloadURL) => {
            const collRef = collection(db, "products");
            addDoc(collRef, {
              actor: {
                image: action.payload.user.photoURL,
                title: action.payload.user.displayName,
                email: action.payload.user.email,
                date: action.payload.timeStamp,
                id: action.payload.user.uid,
              },
              comments: [""],
              likes: [""],
              dislikes: [""],
              title: action.payload.title,
              description: action.payload.desc,
              price: action.payload.price,
              type: action.payload.projType,
              firstImg: downloadURL,
              secondImg:
                "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
              thirdImg:
                "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
            });
          });
        }
      );
    },
    setcomments: (state, action) => {
      const collRef = collection(db, "comments");
      addDoc(collRef, {
        img: action.payload.user.photoURL,
        name: action.payload.user.displayName,
        email: action.payload.user.email,
        comment: action.payload.comment,
        time: action.payload.time,
      });
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const {setProjucts, setLoading, setcomments} = AddProjSlice.actions;
export default AddProjSlice.reducer;
