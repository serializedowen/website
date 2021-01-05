import { IModel } from "egg";

export default function addScopes(model: IModel) {
  model.Comment.addScope("includeUserData", {
    include: [
      {
        model: model.User,
        attributes: ["name", "avatarUrl"],
      },
    ],
  });

  model.User.addScope("includePassword", {
    attributes: ["salt", "password"],
  });

  // model.Comment.addScope("includeUserData", {
  //   include: [
  //     {
  //       model: model.User,
  //     },
  //   ],
  // });
}
