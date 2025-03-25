import { useDispatch } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { useEffect } from "react";
import { settings } from "../redux/Route/slice";

export default function Settings() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(settings());
    }, [dispatch]);
    return (
        <DefaultLayout>
            <div className="container">
                aaaaaaaaaa
            </div>
        </DefaultLayout>
    )
}