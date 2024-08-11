import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import UserItem from "../user/userItem";
import { SaveUser } from "../user/SaveUser";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "@/store/slices/usersSlice";
import { AppDispatch, useAppSelector } from "@/store/store";
import { UserService } from "@/services/user.service";

export function Dashboard() {
  const { items } = useAppSelector((state) => state.user);

  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [page]);

  const [countPage, setCountPage] = useState<number>(1);

  useEffect(() => {
    const fetchUser = async () => {
      UserService.getCountUsers().then((data) => {
        return setCountPage(data.data);
      });
    };
    fetchUser();
  }, [page]);

  const decrease = () => {
    if (page == 1) return;
    setPage(page - 1);
  };
  const increase = () => {
    if (page > Math.ceil(countPage / 4) - 1) return;

    setPage(page + 1);
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                  <SaveUser />
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>Name / Gender</TableHead>
                          <TableHead>Place Of Residence</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Height
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Weight
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Created at
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items?.map((item) => (
                          <UserItem item={item} key={item.id} />
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => decrease()}
                              className={
                                page == 1
                                  ? "hover:cursor-no-drop "
                                  : "hover:cursor-pointer"
                              }
                              color="red"
                              aria-disabled={page ? "true" : "false"}
                            />
                          </PaginationItem>
                          {Array.from({
                            length: Math.ceil(countPage / 4),
                          }).map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                              <PaginationItem key={index}>
                                <PaginationLink
                                  isActive={page === pageNumber ? true : false}
                                  onClick={() => setPage(pageNumber)}
                                  className="hover:cursor-pointer"
                                >
                                  {pageNumber}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => increase()}
                              className={
                                page > Math.ceil(countPage / 4) - 1
                                  ? "hover:cursor-no-drop "
                                  : "hover:cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
