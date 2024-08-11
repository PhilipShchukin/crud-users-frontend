import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserRoundPen } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchUsers } from "@/store/slices/usersSlice";
import { UserService } from "@/services/user.service";
import { IUser } from "@/services/user.interface";

export function EditUser({ item }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const [imageUrl, setImageUrl] = useState(item.avatarPath);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.click();
    }
  };
  //@ts-ignore
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();

      const file = event.target.files[0];

      formData.append("image", file);

      const { data } = await axios.post(
        "http://localhost:4200/api/users/upload",
        formData
      );

      setImageUrl(data.data.filename);
    } catch (error) {
      console.log(error);

      alert("Ошибка при загрузки изображения ");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IUser>();
  const onSubmit: SubmitHandler<IUser> = (data) => {
    data.avatarPath = imageUrl;

    UserService.update(item.id, data);

    setTimeout(() => {
      dispatch(fetchUsers(1));
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="default">
          <UserRoundPen className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>

          <input
            ref={inputFileRef}
            type="file"
            onChange={handleChangeFile}
            hidden
          />
          {imageUrl && (
            <>
              <Avatar className="size-36 ml-32">
                <AvatarImage src={`http://localhost:4200/${imageUrl}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={item.name}
              className="col-span-3"
              type="text"
              placeholder="Name"
              {...register("name", { required: true, max: 0, min: 3 })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="surname" className="text-right">
              Surname
            </Label>
            <Input
              id="surname"
              defaultValue={item.surname}
              className="col-span-3"
              type="text"
              placeholder="Surname"
              {...register("surname", { required: true, max: 0, min: 3 })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <Input
              id="gender"
              defaultValue={item.gender}
              className="col-span-3"
              type="text"
              placeholder="Gender"
              {...register("gender", { required: true, max: 0, min: 3 })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              Height
            </Label>
            <Input
              id="height"
              defaultValue={item.height}
              className="col-span-3"
              type="number"
              placeholder="Height / Number"
              {...register("height", { required: true, valueAsNumber: true })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">
              Weight
            </Label>
            <Input
              id="weight"
              defaultValue={item.weight}
              className="col-span-3"
              type="number"
              placeholder="Weight / Number"
              {...register("weight", { required: true, valueAsNumber: true })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="placeOfResidence" className="text-right">
              Place Of Residence
            </Label>
            <Input
              id="placeOfResidence"
              defaultValue={item.placeOfResidence}
              className="col-span-3"
              type="text"
              placeholder="Place Of Residence"
              {...register("placeOfResidence", { required: true })}
            />
          </div>

          <DialogFooter>
            {imageUrl == "" ? (
              <Button type="button" onClick={() => onButtonClick()}>
                Загрузить фото
              </Button>
            ) : (
              <Button color="error" onClick={onClickRemoveImage}>
                Удалить
              </Button>
            )}
            <DialogTrigger asChild>
              <Button type="submit" disabled={!isValid}>
                Save user
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
