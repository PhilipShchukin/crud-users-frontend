"use client";

import * as React from "react";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IUser } from "@/services/user.interface";
import { UserService } from "@/services/user.service";

export default function UserPage() {
  const { back } = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const [user, setUser] = React.useState<IUser>();

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data } = await UserService.getById(slug);
      setUser(data);
    };
    fetchUser();
  }, []);

  if (!user) return <p>...Loading</p>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src={`http://localhost:4200/${user.avatarPath}`}
                  className=" -m-16 -ml-20 lg:-ml-16 max-w-[250px]"
                />
              </div>
            </div>
            <div className="w-full text-center mt-20">
              <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block  tracking-wide text-slate-700">
                    {user.height}
                  </span>
                  <span className="text-sm text-slate-400">Height</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block  tracking-wide text-slate-700">
                    {user.weight}
                  </span>
                  <span className="text-sm text-slate-400">Weight</span>
                </div>

                <div className="p-3 text-center">
                  <span className="text-xl font-bold block  tracking-wide text-slate-700">
                    {user.gender}
                  </span>
                  <span className="text-sm text-slate-400">Gender</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {user.name + " " + user.surname}
            </h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {user.placeOfResidence}
            </div>
          </div>
          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <Button onClick={back}>Back</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
