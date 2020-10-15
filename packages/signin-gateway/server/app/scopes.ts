import { IModel } from "egg";

export default function addScopes(model: IModel) {
  model.Comment.addScope("includeUserData", {
    include: [
      {
        model: model.User,
      },
    ],
  });

  // model.Comment.addScope("includeUserData", {
  //   include: [
  //     {
  //       model: model.User,
  //     },
  //   ],
  // });
}
