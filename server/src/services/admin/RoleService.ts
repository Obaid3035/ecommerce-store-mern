import { Service } from "typedi";
import Role from "../../model/role";
import BadRequest from "../../utils/errorCode";
import { IRole } from "../../interface";

@Service()
class RoleService {
  async index(skip: number, limit: number) {
    const rolePromise = Role.find()
      .skip(skip)
      .limit(limit).select("title");
    const roleCountPromise = Role.count();

    const [role, roleCount] = await Promise.all([
      rolePromise,
      roleCountPromise,
    ]);
    const formattedUser = role.map((role: any) => {
      return Object.values(role._doc);
    });

    return {
      data: formattedUser,
      count: roleCount,
    };
  }

  async create(userInput: string) {
    await Role.create(userInput);
    return {
      message: "Role created successfully!"
    }
  }

  async update(userInput: IRole, roleId: string) {
    const role = await Role.findById(roleId);
    if(!role) {
      throw new BadRequest("Role not found");
    }
    await Role.findByIdAndUpdate(roleId, userInput)
    return {
      message: "Role updated successfully!"
    }
  }

  async show(roleId: string) {
    const role = await Role.findById(roleId);
    if(!role) {
      throw new BadRequest("Role not found");
    }

    return role;
  }

  async getRolesSelect() {
    const role = await Role.aggregate([
      {
        $project: {
          "_id": 0,
          label: "$title",
          value: "$_id",
        }
      }
    ])

    return role;
  }
}
export default RoleService;
