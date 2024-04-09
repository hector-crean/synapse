
import * as z from 'zod';


// Permission must be either [], ['room:write'] or ['room:read', 'room:presence:write']


const PermissionEnumSchema = z.enum(["room:write", "room:read", "room:presence:write"])
type PermissionEnumType = z.infer<typeof PermissionEnumSchema>;

const RoomPermissionSchema = z.array(PermissionEnumSchema);
type RoomPermissionType = z.infer<typeof RoomPermissionSchema>;

const RoomAccessesSchema = z.record(RoomPermissionSchema);
type RoomAccessesType = z.infer<typeof RoomAccessesSchema>;


const RoomTypeSchema = z.enum(["text", "whiteboard", "flow"])
type RoomType = z.infer<typeof RoomTypeSchema>

const RoomMetadataSchema = z.object({ type: RoomTypeSchema })
type RoomMetadataType = z.infer<typeof RoomMetadataSchema>;


const RoomInfoSchema = z.object({
    type: z.literal('room'),
    id: z.string(),
    createdAt: z.date(),
    lastConnectionAt: z.date().nullable(),
    defaultAccesses: RoomPermissionSchema,
    usersAccesses: RoomAccessesSchema,
    groupsAccesses: RoomAccessesSchema,
    metadata: RoomMetadataSchema
})
type RoomInfoType = z.infer<typeof RoomInfoSchema>;


const RoomUserSchema = <Info extends z.ZodType<any, any>>(infoSchema: Info) =>
    z.object({
        type: z.literal("user"),
        id: z.string().nullable(),
        connectionId: z.number(),
        info: infoSchema
    });


type RoomUserType<InfoType extends z.ZodType<any, any>> = z.TypeOf<ReturnType<typeof RoomUserSchema<InfoType>>>;




export { PermissionEnumSchema, RoomAccessesSchema, RoomInfoSchema, RoomPermissionSchema, RoomTypeSchema, RoomUserSchema };
export type { PermissionEnumType, RoomAccessesType, RoomInfoType, RoomMetadataType, RoomPermissionType, RoomType, RoomUserType };

